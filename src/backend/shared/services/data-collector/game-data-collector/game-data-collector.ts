import IBatchFetcher from '../../batch-fetcher/batch-fetcher.interface';
import IDataReducer from '../../data-reducer/data-reducer.interface';
import IDataStorageManager from '../../data-storage-manager/data-storage-manager.interface';

import IGameDataCollector from './game-data-collector.interface';

export default class GameDataCollector implements IGameDataCollector {

    private _fetcher: IBatchFetcher;
    private _reducer: IDataReducer;
    private _storageManager: IDataStorageManager;

    constructor(

        fetcher: IBatchFetcher,
        reducer: IDataReducer,
        storageManager: IDataStorageManager

    ) {

        this._fetcher = fetcher;
        this._reducer = reducer;
        this._storageManager = storageManager;
    }

    private sortByViews(data: any[], key: string): any[] {

        return data.slice().sort((a, b) => +b[key] - +a[key]);
    }

    private async addToStorage(data: any[], key?: string): Promise<void> {

        const saved = await this._storageManager.addToPersistent(data);
        await this._storageManager.addToMemory(saved, key);
    }

    public async collect(): Promise<void> {

        const data = await this._fetcher.batchFetch();
        const reduced = this._reducer.reduce(data);

        await this.addToStorage(this.sortByViews(reduced, 'view_count'));
    }

    public async collectById(id: number): Promise<void> {

        const data = await this._fetcher.batchFetchByGameId(id);
        const reduced = this._reducer.reduce(data);

        await this.addToStorage(reduced.slice(0, 1), `games/${id}`);
    }
}
