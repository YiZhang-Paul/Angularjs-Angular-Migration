import IDataStorageManager from '../../../shared/services/data-storage-manager/data-storage-manager.interface';
import gameDataCollectorPromise from '../../../shared/services/data-collector/game-data-collector/game-data-collector.factory';
import IGameDataCollector from '../../../shared/services/data-collector/game-data-collector/game-data-collector.interface';
// tslint:disable-next-line:max-line-length
import GameDataStorageManagerFactory from '../../../shared/services/data-storage-manager/game-data-storage-manager/game-data-storage-manager.factory';

export class GameController {

    private _storage: IDataStorageManager;
    private _collector: IGameDataCollector | null = null;
    private _collectorPromise: Promise<IGameDataCollector>;

    constructor(storage: IDataStorageManager, collectorPromise: Promise<IGameDataCollector>) {

        this._storage = storage;
        this._collectorPromise = collectorPromise;
        this.loadCollector(collectorPromise);
    }

    private async loadCollector(collectorPromise: Promise<IGameDataCollector>): Promise<void> {

        this._collector = await collectorPromise;
    }

    private async getCachedGame(id: number): Promise<any | null> {

        const cached = await this.getGames();
        const result = cached.find(_ => _['id'] === id);

        return result ? result : null;
    }

    private async getCollectedGame(id: number): Promise<any | null> {

        await this.loadCollector(this._collectorPromise);

        if (this._collector) {

            await this._collector.collectById(id);
        }

        const result = await this._storage.getFromMemory(`games/${id}`);

        return result.length ? result[0] : null;
    }

    public async getGames(): Promise<any[]> {

        return this._storage.getFromMemory();
    }

    public async getGameById(id: number): Promise<any | null> {

        const cached = await this.getCachedGame(id);

        return cached ? cached : this.getCollectedGame(id);
    }
}

const storageManager = new GameDataStorageManagerFactory().createStorageManager();

export default new GameController(storageManager, gameDataCollectorPromise);
