import IChannelRepository from '../../repositories/channel-repository/channel-repository.interface';
import IGameRepository from '../../repositories/game-repository/game-repository.interface';
import IProviderRepository from '../../repositories/provider-repository/provider-repository.interface';

import IProviderResolver from './provider-resolver.interface';

export default class ProviderResolver implements IProviderResolver {

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

    public async resolveId(name: string): Promise<number> {

        return this._providerRepository.findIdByName(name);
    }

    public async resolveApi(name: string, type: string): Promise<string | null> {

        const apis = await this._providerRepository.findApisByName(name);

        return apis && apis[type] ? apis[type] : null;
    }

    public async resolveGameId(name: string, gameId: number): Promise<number> {

        const providerId = await this.resolveId(name);
        const providers = await this._gameRepository.findProvidersById(gameId);

        if (providerId === -1 || !providers.length) {

            return -1;
        }

        const result = providers.find(_ => +_.provider_id === providerId);

        return result ? +result.provider_game_id : -1;
    }

    public async resolveChannelId(id: number): Promise<number> {

        const channel = await this._channelRepository.findById(`${id}`);

        return channel ? channel.toObject().provider_channel_id : -1;
    }
}
