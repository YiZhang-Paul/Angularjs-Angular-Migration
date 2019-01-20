import IBatchFetcher from '../../shared/services/batch-fetcher/batch-fetcher.interface';

import IDataReducer from './data-reducer.interface';
import IDataStorageManager from './data-storage-manager.interface';
import IGameDataCollector from './game-data-collector.interface';

export default class GameDataCollector implements IGameDataCollector {

    private _fetcher: IBatchFetcher;
    private _reducer: IDataReducer;
    private _storageManager: IDataStorageManager;

    constructor(

        batchFetcher: IBatchFetcher,
        reducer: IDataReducer,
        storageManager: IDataStorageManager

    ) {
        this._fetcher = batchFetcher;
        this._reducer = reducer;
        this._storageManager = storageManager;
    }

    private sortByViews(data: any[]): any[] {

        const key = 'view_count';

        return data.slice().sort((a, b) => +b[key] - +a[key]);
    }

    private async addToStorage(data: any[], key?: string): Promise<void> {

        const saved = await this._storageManager.addToPersistent(data);
        await this._storageManager.addToMemory(saved, key);

        console.log(saved);
        console.log(saved.length);
    }

    public async collect(): Promise<void> {

        const data = await this._fetcher.batchFetch();
        const reduced = this._reducer.reduce(data);

        await this.addToStorage(this.sortByViews(reduced));
    }

    public async collectById(id: number): Promise<void> {

        const data = await this._fetcher.batchFetchById(id);
        const reduced = this._reducer.reduce(data);

        await this.addToStorage(reduced.slice(0, 1), `games/${id}`);
    }
}
