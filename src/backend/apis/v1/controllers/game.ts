import channelDataCollectorPromise from '../../../shared/services/data-collector/channel-data-collector/channel-data-collector.factory';
import IChannelDataCollector from '../../../shared/services/data-collector/channel-data-collector/channel-data-collector.interface';
import IDataStorageManager from '../../../shared/services/data-storage-manager/data-storage-manager.interface';
import gameDataCollectorPromise from '../../../shared/services/data-collector/game-data-collector/game-data-collector.factory';
import IGameDataCollector from '../../../shared/services/data-collector/game-data-collector/game-data-collector.interface';
// tslint:disable-next-line:max-line-length
import GameDataStorageManagerFactory from '../../../shared/services/data-storage-manager/game-data-storage-manager/game-data-storage-manager.factory';

export class GameController {

    private _storage: IDataStorageManager;
    private _channelCollector: IChannelDataCollector | null = null;
    private _channelCollectorPromise: Promise<IChannelDataCollector>;
    private _gameCollector: IGameDataCollector | null = null;
    private _gameCollectorPromise: Promise<IGameDataCollector>;

    constructor(

        storage: IDataStorageManager,
        gameCollectorPromise: Promise<IGameDataCollector>,
        channelCollectorPromise: Promise<IChannelDataCollector>

    ) {

        this._storage = storage;
        this._gameCollectorPromise = gameCollectorPromise;
        this._channelCollectorPromise = channelCollectorPromise;
        this.loadGameCollector(gameCollectorPromise);
    }

    private async loadGameCollector(collectorPromise: Promise<IGameDataCollector>): Promise<void> {

        this._gameCollector = await collectorPromise;
    }

    private async loadChannelCollector(collectorPromise: Promise<IChannelDataCollector>): Promise<void> {

        this._channelCollector = await collectorPromise;
    }

    private attachChannelUrl(data: any): any {

        const key = 'id';

        if (data.hasOwnProperty(key)) {

            data['channels'] = `api/v1/games/${data[key]}/channels`;
        }

        return data;
    }

    private attachGameId(data: any[], id: number): any[] {

        return data.map(_ => {

            _['game_id'] = id;

            return _;
        });
    }

    private async getCachedGame(id: number): Promise<any | null> {

        const cached = await this.getGames();
        const result = cached.find(_ => _['id'] === id);

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

    private async getCachedChannels(key: string): Promise<any[]> {

        const result = await this._storage.getFromMemory(key);

        return result && result.length ? result : [];
    }

    private async getCollectedChannels(id: number, key: string): Promise<any[]> {

        await this.loadChannelCollector(this._channelCollectorPromise);

        if (this._channelCollector) {

            await this._channelCollector.collectByGameId(id);
        }

        return this.getCachedChannels(key);
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

        const key = `games/${id}/channels`;
        const cached = await this.getCachedChannels(key);

        const result = cached && cached.length ?
            cached : await this.getCollectedChannels(id, key);

        return this.attachGameId(result, id);
    }
}

export default new GameController(

    new GameDataStorageManagerFactory().createStorageManager(),
    gameDataCollectorPromise,
    channelDataCollectorPromise
);
