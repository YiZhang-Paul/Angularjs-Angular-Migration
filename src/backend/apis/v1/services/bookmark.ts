import { Document } from 'mongoose';

import BookmarkRepositoryFactory from '../../../shared/repositories/bookmark-repository/bookmark-repository.factory';
import IBookmarkRepository from '../../../shared/repositories/bookmark-repository/bookmark-repository.interface';
import KeyRemover from '../../../shared/services/key-remover/key-remover';
import IKeyRemover from '../../../shared/services/key-remover/key-remover.interface';

import channelService from './channel/channel';
import IChannelService from './channel/channel-service.interface';

export class BookmarkService {

    private _remover: IKeyRemover;
    private _channelService: IChannelService;
    private _repository: IBookmarkRepository;

    constructor(

        remover: IKeyRemover,
        channelService: IChannelService,
        repository: IBookmarkRepository

    ) {

        this._remover = remover;
        this._channelService = channelService;
        this._repository = repository;
    }
    // TODO: extract abstract base class?
    private toObject(document: Document): any {

        const object = document.toObject();
        const keys = ['_id', '__v'];

        return this._remover.remove([object], keys)[0];
    }

    private async findBookmark(userId: number, channelId: number): Promise<any> {

        const filter = { user_id: userId, channel_id: channelId };
        const result = await this._repository.findOne(filter);

        return result ? result.toObject() : null;
    }
    // TODO: move to channel service?
    private async prepareChannel(data: any): Promise<any> {

        const { providerId, providerChannelId, gameId } = data;

        if (!await this._channelService.isValidChannel(providerId, gameId)) {

            return null;
        }

        return this._channelService.findOrCreateChannel(providerId, providerChannelId);
    }

    private async insertBookmark(channelId: number, data: any): Promise<any> {

        const bookmarkData: any = {

            user_id: data.userId,
            game_id: data.gameId,
            channel_id: channelId,
            streamer_name: data.streamerName,
            title: data.title
        };

        if (data.image) { bookmarkData.image = data.image; }

        return this._repository.insertOne(bookmarkData);
    }

    public async createBookmark(data: any): Promise<201 | 204 | 400> {

        const channel = await this.prepareChannel(data);

        if (!channel) {

            return 400;
        }

        const bookmark = await this.findBookmark(data.userId, channel.id);

        if (bookmark) {

            return 204;
        }

        return await this.insertBookmark(channel.id, data) ? 201 : 400;
    }

    public async getBookmark(id: number, userId: number): Promise<any> {

        const filter = { id, user_id: userId };
        const bookmark = await this._repository.findOne(filter);

        if (!bookmark) {

            return null;
        }

        return this.toObject(bookmark);
    }

    public async getBookmarks(id: number): Promise<any[]> {

        const filter = { user_id: id };
        const result = await this._repository.find(filter);

        return result.map(_ => this.toObject(_));
    }

    public async deleteBookmark(id: number, userId: number): Promise<boolean> {

        const filter = { id, user_id: userId };

        return this._repository.deleteOne(filter);
    }
}

export default new BookmarkService(

    new KeyRemover(),
    channelService,
    new BookmarkRepositoryFactory().createRepository()
);
