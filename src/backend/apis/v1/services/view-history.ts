import { Document } from 'mongoose';

import ChannelRepositoryFactory from '../../../shared/repositories/channel-repository/channel-repository.factory';
import IChannelRepository from '../../../shared/repositories/channel-repository/channel-repository.interface';
import GameRepositoryFactory from '../../../shared/repositories/game-repository/game-repository.factory';
import IGameRepository from '../../../shared/repositories/game-repository/game-repository.interface';
import KeyRemover from '../../../shared/services/key-remover/key-remover';
import IKeyRemover from '../../../shared/services/key-remover/key-remover.interface';
import ProviderRepositoryFactory from '../../../shared/repositories/provider-repository/provider-repository.factory';
import IProviderRepository from '../../../shared/repositories/provider-repository/provider-repository.interface';
import ViewHistoryRepositoryFactory from '../../../shared/repositories/view-history-repository/view-history-repository.factory';
import IViewHistoryRepository from '../../../shared/repositories/view-history-repository/view-history-repository.interface';

export class ViewHistoryService {

    private _providerRepository: IProviderRepository;
    private _gameRepository: IGameRepository;
    private _channelRepository: IChannelRepository;
    private _viewHistoryRepository: IViewHistoryRepository;
    private _remover: IKeyRemover;

    constructor(

        providerRepository: IProviderRepository,
        gameRepository: IGameRepository,
        channelRepository: IChannelRepository,
        viewHistoryRepository: IViewHistoryRepository,
        remover: IKeyRemover

    ) {

        this._providerRepository = providerRepository;
        this._gameRepository = gameRepository;
        this._channelRepository = channelRepository;
        this._viewHistoryRepository = viewHistoryRepository;
        this._remover = remover;
    }

    private toObject(document: Document): any {

        const object = document.toObject();
        const keys = ['_id', '__v'];

        return this._remover.remove([object], keys)[0];
    }

    private async hasProvider(id: number): Promise<boolean> {

        return await this._providerRepository.has(id);
    }

    private async hasGame(id: number): Promise<boolean> {

        return await this._gameRepository.has(id);
    }

    private async isValidChannel(providerId: number, gameId: number): Promise<boolean> {

        return await this.hasProvider(providerId) && await this.hasGame(gameId);
    }

    private async findHistory(userId: number, channelId: number): Promise<any> {

        const filter = { user_id: userId, channel_id: channelId };
        const result = await this._viewHistoryRepository.findOne(filter);

        return result ? result.toObject() : null;
    }

    private async findOrCreateChannel(data: any): Promise<any> {

        const channelData = {

            provider_id: data.providerId,
            provider_channel_id: data.providerChannelId
        };

        let channel = await this._channelRepository.findOne(channelData);

        if (!channel) {

            channel = await this._channelRepository.insertOne(channelData);
        }

        return channel ? channel.toObject() : null;
    }

    private async prepareChannel(data: any): Promise<any> {

        if (!await this.isValidChannel(data.providerId, data.gameId)) {

            return null;
        }

        return this.findOrCreateChannel(data);
    }

    private async insertHistory(channelId: number, data: any): Promise<any> {

        const historyData: any = {

            user_id: data.userId,
            game_id: data.gameId,
            channel_id: channelId,
            streamer_name: data.streamerName,
            game_name: data.gameName,
            title: data.title
        };

        if (data.image) { historyData['image'] = data.image; }

        return this._viewHistoryRepository.insertOne(historyData);
    }

    private async updateHistory(id: number, data: any): Promise<any> {

        const historyData: any = {

            timestamp: new Date(),
            game_id: data.gameId,
            streamer_name: data.streamerName,
            game_name: data.gameName
        };
        // TODO: use consistent property accessor
        if (data.title) { historyData['title'] = data.title; }
        if (data.image) { historyData['image'] = data.image; }

        return this._viewHistoryRepository.updateOne(historyData, { id });
    }

    public async createHistory(data: any): Promise<201 | 204 | 400> {

        const channel = await this.prepareChannel(data);

        if (!channel) {

            return 400;
        }

        const history = await this.findHistory(data.userId, channel['id']);

        if (history) {

            return await this.updateHistory(history['id'], data) ? 204 : 400;
        }

        return await this.insertHistory(channel['id'], data) ? 201 : 400;
    }

    public async getHistory(id: number, userId: number): Promise<any> {

        const filter = { id, user_id: userId };
        const result = await this._viewHistoryRepository.findOne(filter);

        return result ? this.toObject(result) : null;
    }

    public async getHistories(id: number): Promise<any[]> {

        const filter = { user_id: id };
        const result = await this._viewHistoryRepository.find(filter);

        return result.map(_ => this.toObject(_));
    }

    public async clearHistory(id: number, userId: number): Promise<boolean> {

        const filter = { id, user_id: userId };

        return this._viewHistoryRepository.deleteOne(filter);
    }

    public async clearHistories(id: number): Promise<boolean> {

        const filter = { user_id: id };
        const result = await this._viewHistoryRepository.delete(filter);

        return !!result;
    }
}

export default new ViewHistoryService(

    new ProviderRepositoryFactory().createRepository(),
    new GameRepositoryFactory().createRepository(),
    new ChannelRepositoryFactory().createRepository(),
    new ViewHistoryRepositoryFactory().createRepository(),
    new KeyRemover()
);
