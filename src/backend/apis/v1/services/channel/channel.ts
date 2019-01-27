import channelDataCollectorPromise from '../../../../shared/services/data-collector/channel-data-collector/channel-data-collector.factory';
import IChannelDataCollector from '../../../../shared/services/data-collector/channel-data-collector/channel-data-collector.interface';
import ChannelRepositoryFactory from '../../../../shared/repositories/channel-repository/channel-repository.factory';
import IChannelRepository from '../../../../shared/repositories/channel-repository/channel-repository.interface';
import GameRepositoryFactory from '../../../../shared/repositories/game-repository/game-repository.factory';
import IGameRepository from '../../../../shared/repositories/game-repository/game-repository.interface';
import GameResolver from '../../../../shared/services/game-resolver/game-resolver';
import IGameResolver from '../../../../shared/services/game-resolver/game-resolver.interface';
import MemoryDataStore from '../../../../shared/services/data-store/memory-data-store/memory-data-store';
import IMemoryDataStore from '../../../../shared/services/data-store/memory-data-store/memory-data-store.interface';
import ProviderRepositoryFactory from '../../../../shared/repositories/provider-repository/provider-repository.factory';
import IProviderRepository from '../../../../shared/repositories/provider-repository/provider-repository.interface';

import IChannelService from './channel-service.interface';

export class ChannelService implements IChannelService {

    private _dataStore: IMemoryDataStore;
    private _gameResolver: IGameResolver;
    private _providerRepository: IProviderRepository;
    private _gameRepository: IGameRepository;
    private _channelRepository: IChannelRepository;
    private _channelCollector: IChannelDataCollector | null = null;
    private _channelCollectorPromise: Promise<IChannelDataCollector>;

    constructor(

        dataStore: IMemoryDataStore,
        gameResolver: IGameResolver,
        providerRepository: IProviderRepository,
        gameRepository: IGameRepository,
        channelRepository: IChannelRepository,
        channelCollectorPromise: Promise<IChannelDataCollector>

    ) {

        this._dataStore = dataStore;
        this._gameResolver = gameResolver;
        this._providerRepository = providerRepository;
        this._gameRepository = gameRepository;
        this._channelRepository = channelRepository;
        this._channelCollectorPromise = channelCollectorPromise;
        this.loadChannelCollector(channelCollectorPromise);
    }

    private async loadChannelCollector(collectorPromise: Promise<IChannelDataCollector>): Promise<void> {

        this._channelCollector = await collectorPromise;
    }

    private async hasProvider(id: number): Promise<boolean> {

        return await this._providerRepository.has(id);
    }

    private async hasGame(id: number): Promise<boolean> {

        return await this._gameRepository.has(id);
    }

    private async attachResolvedGameId(channels: any[]): Promise<any[]> {

        const result = channels.map(async _ => {

            const game = await this._gameResolver.resolveByChannel(_);
            _.game_id = game ? game.id : null;

            return _;
        });

        return Promise.all(result);
    }
    // TODO: extract to generic function
    private attachGameId(data: any[], id: number): any[] {

        return data.map(_ => {

            _.game_id = id;

            return _;
        });
    }

    private attachDefaultImage(data: any[]): any[] {

        const image = 'https://www.bitgab.com/uploads/profile/files/default.png';

        return data.map(_ => {

            if (!_.image) {

                _.image = image;
            }

            return _;
        });
    }

    private async getCachedChannels(key: string): Promise<any[]> {

        const result = await this._dataStore.get(key);

        return result && result.length ? result : [];
    }

    private async getCollectedChannels(key: string): Promise<any[]> {

        await this.loadChannelCollector(this._channelCollectorPromise);

        if (this._channelCollector) {

            await this._channelCollector.collect();
        }

        return this.getCachedChannels(key);
    }

    private async getCollectedChannelsByGameId(id: number, key: string): Promise<any[]> {

        await this.loadChannelCollector(this._channelCollectorPromise);

        if (this._channelCollector) {

            await this._channelCollector.collectByGameId(id);
        }

        return this.getCachedChannels(key);
    }

    public async getChannels(): Promise<any[]> {

        const key = 'channels';
        const cached = await this.getCachedChannels(key);

        const result = cached && cached.length ?
            cached : await this.getCollectedChannels(key);

        return this.attachDefaultImage(await this.attachResolvedGameId(result));
    }

    public async getChannelsByGameId(id: number): Promise<any[]> {

        const key = `games/${id}/channels`;
        const cached = await this.getCachedChannels(key);

        const result = cached && cached.length ?
            cached : await this.getCollectedChannelsByGameId(id, key);

        return this.attachDefaultImage(this.attachGameId(result, id));
    }

    public async isValidChannel(providerId: number, gameId: number): Promise<boolean> {

        return await this.hasProvider(providerId) && await this.hasGame(gameId);
    }

    public async findOrCreateChannel(providerId: number, providerChannelId: number): Promise<any> {

        const channelData = {

            provider_id: providerId,
            provider_channel_id: providerChannelId
        };

        let channel = await this._channelRepository.findOne(channelData);

        if (!channel) {

            channel = await this._channelRepository.insertOne(channelData);
        }

        return channel ? channel.toObject() : null;
    }
}

const gameRepository = new GameRepositoryFactory().createRepository();

export default new ChannelService(

    new MemoryDataStore(),
    new GameResolver(gameRepository),
    new ProviderRepositoryFactory().createRepository(),
    gameRepository,
    new ChannelRepositoryFactory().createRepository(),
    channelDataCollectorPromise
);
