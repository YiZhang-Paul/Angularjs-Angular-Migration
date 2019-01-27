import { Document } from 'mongoose';

import KeyRemover from '../../../shared/services/key-remover/key-remover';
import IKeyRemover from '../../../shared/services/key-remover/key-remover.interface';
import ViewHistoryRepositoryFactory from '../../../shared/repositories/view-history-repository/view-history-repository.factory';
import IViewHistoryRepository from '../../../shared/repositories/view-history-repository/view-history-repository.interface';

import channelService from './channel/channel';
import IChannelService from './channel/channel-service.interface';

export class ViewHistoryService {

    private _remover: IKeyRemover;
    private _channelService: IChannelService;
    private _repository: IViewHistoryRepository;

    constructor(

        remover: IKeyRemover,
        channelService: IChannelService,
        repository: IViewHistoryRepository

    ) {

        this._remover = remover;
        this._channelService = channelService;
        this._repository = repository;
    }

    private toObject(document: Document): any {

        const object = document.toObject();
        const keys = ['_id', '__v'];

        return this._remover.remove([object], keys)[0];
    }

    private attachDefaultThumbnail(data: any[]): any[] {

        const thumbnail = 'https://cdnb.artstation.com/p/assets/images/images/002/305/833/large/rami-m-twitch-offline01.jpg?1460036990';

        return data.map(_ => {

            if (!_.thumbnail) {

                _.thumbnail = thumbnail;
            }

            return _;
        });
    }

    private async findHistory(userId: number, channelId: number): Promise<any> {

        const filter = { user_id: userId, channel_id: channelId };
        const result = await this._repository.findOne(filter);

        return result ? result.toObject() : null;
    }

    private async prepareChannel(data: any): Promise<any> {

        const { providerId, providerChannelId, gameId } = data;

        if (!await this._channelService.isValidChannel(providerId, gameId)) {

            return null;
        }

        return this._channelService.findOrCreateChannel(providerId, providerChannelId);
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

        if (data.image) { historyData.image = data.image; }
        if (data.thumbnail) { historyData.thumbnail = data.thumbnail; }

        return this._repository.insertOne(historyData);
    }

    private async updateHistory(id: number, data: any): Promise<any> {

        const historyData: any = {

            timestamp: Date.now(),
            game_id: data.gameId,
            streamer_name: data.streamerName,
            game_name: data.gameName
        };

        if (data.title) { historyData.title = data.title; }
        if (data.image) { historyData.image = data.image; }
        if (data.thumbnail) { historyData.thumbnail = data.thumbnail; }

        return this._repository.updateOne(historyData, { id });
    }

    public async createHistory(data: any): Promise<201 | 204 | 400> {

        const channel = await this.prepareChannel(data);

        if (!channel) {

            return 400;
        }

        const history = await this.findHistory(data.userId, channel.id);

        if (history) {

            return await this.updateHistory(history.id, data) ? 204 : 400;
        }

        return await this.insertHistory(channel.id, data) ? 201 : 400;
    }

    public async getHistory(id: number, userId: number): Promise<any> {

        const filter = { id, user_id: userId };
        const history = await this._repository.findOne(filter);

        if (!history) {

            return null;
        }

        const result = this.toObject(history);

        return this.attachDefaultThumbnail([result])[0];
    }

    public async getHistories(id: number): Promise<any[]> {

        const filter = { user_id: id };
        const histories = await this._repository.find(filter);
        const result = histories.map(_ => this.toObject(_));

        return this.attachDefaultThumbnail(result);
    }

    public async clearHistory(id: number, userId: number): Promise<boolean> {

        const filter = { id, user_id: userId };

        return this._repository.deleteOne(filter);
    }

    public async clearHistories(id: number): Promise<boolean> {

        const filter = { user_id: id };
        const result = await this._repository.delete(filter);

        return !!result;
    }
}

export default new ViewHistoryService(

    new KeyRemover(),
    channelService,
    new ViewHistoryRepositoryFactory().createRepository()
);
