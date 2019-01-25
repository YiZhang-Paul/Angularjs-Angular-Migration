import ChannelRepositoryFactory from '../../../../shared/repositories/channel-repository/channel-repository.factory';
import IChannelRepository from '../../../../shared/repositories/channel-repository/channel-repository.interface';
import GameRepositoryFactory from '../../../../shared/repositories/game-repository/game-repository.factory';
import IGameRepository from '../../../../shared/repositories/game-repository/game-repository.interface';
import ProviderRepositoryFactory from '../../../../shared/repositories/provider-repository/provider-repository.factory';
import IProviderRepository from '../../../../shared/repositories/provider-repository/provider-repository.interface';

import IChannelService from './channel-service.interface';

export class ChannelService implements IChannelService {

    private _providerRepository: IProviderRepository;
    private _gameRepository: IGameRepository;
    private _channelRepository: IChannelRepository;

    constructor(

        providerRepository: IProviderRepository,
        gameRepository: IGameRepository,
        channelRepository: IChannelRepository

    ) {

        this._providerRepository = providerRepository;
        this._gameRepository = gameRepository;
        this._channelRepository = channelRepository;
    }

    private async hasProvider(id: number): Promise<boolean> {

        return await this._providerRepository.has(id);
    }

    private async hasGame(id: number): Promise<boolean> {

        return await this._gameRepository.has(id);
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

    new ProviderRepositoryFactory().createRepository(),
    new GameRepositoryFactory().createRepository(),
    new ChannelRepositoryFactory().createRepository()
);
