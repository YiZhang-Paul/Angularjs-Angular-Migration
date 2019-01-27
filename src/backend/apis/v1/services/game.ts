import IDataStorageManager from '../../../shared/services/data-storage-manager/data-storage-manager.interface';
import gameDataCollectorPromise from '../../../shared/services/data-collector/game-data-collector/game-data-collector.factory';
import IGameDataCollector from '../../../shared/services/data-collector/game-data-collector/game-data-collector.interface';
// tslint:disable-next-line:max-line-length
import GameDataStorageManagerFactory from '../../../shared/services/data-storage-manager/game-data-storage-manager/game-data-storage-manager.factory';

import channelService from './channel/channel';
import IChannelService from './channel/channel-service.interface';

export class GameService {

    private _storage: IDataStorageManager;
    private _channelService: IChannelService;
    private _gameCollector: IGameDataCollector | null = null;
    private _gameCollectorPromise: Promise<IGameDataCollector>;

    constructor(

        storage: IDataStorageManager,
        channelService: IChannelService,
        gameCollectorPromise: Promise<IGameDataCollector>

    ) {

        this._storage = storage;
        this._channelService = channelService;
        this._gameCollectorPromise = gameCollectorPromise;
        this.loadGameCollector(gameCollectorPromise);
    }

    private async loadGameCollector(collectorPromise: Promise<IGameDataCollector>): Promise<void> {

        this._gameCollector = await collectorPromise;
    }

    private attachChannelUrl(data: any): any {

        const key = 'id';

        if (data.hasOwnProperty(key)) {

            data.channels = `api/v1/games/${data[key]}/channels`;
        }

        return data;
    }

    private async getCachedGame(id: number): Promise<any | null> {

        const cached = await this.getGames();
        const result = cached.find(_ => _.id === id);

        return result ? result : null;
    }

    private async getCollectedGame(id: number): Promise<any | null> {

        await this.loadGameCollector(this._gameCollectorPromise);

        if (this._gameCollector) {

            await this._gameCollector.collectById(id);
        }

        const result = await this._storage.getFromMemory(`games/${id}`);

        return result && result.length ? result[0] : null;
    }

    public async getGames(): Promise<any[]> {

        const games = await this._storage.getFromMemory();

        if (Array.isArray(games)) {

            return games.map(_ => this.attachChannelUrl(_));
        }

        return games;
    }

    public async getGameById(id: number): Promise<any | null> {

        const cached = await this.getCachedGame(id);
        const result = cached ? cached : await this.getCollectedGame(id);

        return result ? this.attachChannelUrl(result) : null;
    }

    public async getChannelsByGameId(id: number): Promise<any[]> {

        return this._channelService.getChannelsByGameId(id);
    }
}

export default new GameService(

    new GameDataStorageManagerFactory().createStorageManager(),
    channelService,
    gameDataCollectorPromise
);
