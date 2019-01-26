import channelDataCollectorPromise from '../../../../shared/services/data-collector/channel-data-collector/channel-data-collector.factory';
import IChannelDataCollector from '../../../../shared/services/data-collector/channel-data-collector/channel-data-collector.interface';
import ChannelRepositoryFactory from '../../../../shared/repositories/channel-repository/channel-repository.factory';
import IChannelRepository from '../../../../shared/repositories/channel-repository/channel-repository.interface';
import GameRepositoryFactory from '../../../../shared/repositories/game-repository/game-repository.factory';
import IGameRepository from '../../../../shared/repositories/game-repository/game-repository.interface';
import MemoryDataStore from '../../../../shared/services/data-store/memory-data-store/memory-data-store';
import IMemoryDataStore from '../../../../shared/services/data-store/memory-data-store/memory-data-store.interface';
import ProviderRepositoryFactory from '../../../../shared/repositories/provider-repository/provider-repository.factory';
import IProviderRepository from '../../../../shared/repositories/provider-repository/provider-repository.interface';

import IChannelService from './channel-service.interface';

export class ChannelService implements IChannelService {

    private _dataStore: IMemoryDataStore;
    private _channelCollector: IChannelDataCollector | null = null;
    private _channelCollectorPromise: Promise<IChannelDataCollector>;
    private _providerRepository: IProviderRepository;
    private _gameRepository: IGameRepository;
    private _channelRepository: IChannelRepository;

    private _resolvedIds = new Map<string, number | null>();

    constructor(

        dataStore: IMemoryDataStore,
        channelCollectorPromise: Promise<IChannelDataCollector>,
        providerRepository: IProviderRepository,
        gameRepository: IGameRepository,
        channelRepository: IChannelRepository

    ) {

        this._dataStore = dataStore;
        this._channelCollectorPromise = channelCollectorPromise;
        this._providerRepository = providerRepository;
        this._gameRepository = gameRepository;
        this._channelRepository = channelRepository;
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

    private findResolvedId(key: string): number | null {

        if (!this._resolvedIds.has(key)) {

            return null;
        }

        const id = this._resolvedIds.get(key);

        return id === undefined ? null : id;
    }
    // TODO: extract to class
    private async resolveGameId(channel: any): Promise<number | null> {

        const key = `${channel.provider_id}<|>${channel.provider_game_id}`;
        const resolvedId = this.findResolvedId(key);

        if (resolvedId !== null) {

            return resolvedId;
        }

        const filter = {

            'search_api_keys.provider_id': channel.provider_id,
            'search_api_keys.provider_game_id': channel.provider_game_id
        };

        const game = await this._gameRepository.findOne(filter);
        const result = game ? game.toObject().id : null;
        this._resolvedIds.set(key, result);

        return result;
    }

    private async attachResolvedGameId(channels: any[]): Promise<any[]> {

        const result = channels.map(async _ => {

            _.game_id = await this.resolveGameId(_);

            return _;
        });

        return Promise.all(result);
    }

    private attachGameId(data: any[], id: number): any[] {

        return data.map(_ => {

            _.game_id = id;

            return _;
        });
    }

    protected attachDefaultImage(data: any[]): any[] {

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

export default new ChannelService(

    new MemoryDataStore(),
    channelDataCollectorPromise,
    new ProviderRepositoryFactory().createRepository(),
    new GameRepositoryFactory().createRepository(),
    new ChannelRepositoryFactory().createRepository()
);
