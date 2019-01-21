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

    public async getGames(): Promise<any[]> {

        return this._storage.getFromMemory();
    }

    public async getGameById(id: number): Promise<any | null> {

        const cached = await this.getCachedGame(id);

        return cached ? cached : this.getCollectedGame(id);
    }

    public async getChannelsByGameId(id: number): Promise<any[]> {

        const key = `games/${id}/channels`;
        const cached = await this._storage.getFromMemory(key);

        if (cached && cached.length) {

            return cached.map(_ => {

                _['game_id'] = id;

                return _;
            });
        }

        await this.loadChannelCollector(this._channelCollectorPromise);

        if (this._channelCollector) {

            await this._channelCollector.collectByGameId(id);
        }

        const result = await this._storage.getFromMemory(key);

        return result && result.length ? result.map(_ => {

            _['game_id'] = id;

            return _;

        }) : [];
    }
}

const storageManager = new GameDataStorageManagerFactory().createStorageManager();

export default new GameController(

    storageManager,
    gameDataCollectorPromise,
    channelDataCollectorPromise
);
