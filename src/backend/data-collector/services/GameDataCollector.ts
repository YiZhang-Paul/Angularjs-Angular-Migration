import IProviderResolver from '../../shared/services/IProviderResolver.interface';

import IDataReducer from './IDataReducer.interface';
import IDataStorageManager from './IDataStorageManager.interface';
import IGameDataCollector from './IGameDataCollector.interface';
import IGameFetcher from './IGameFetcher.interface';

export default class GameDataCollector implements IGameDataCollector {

    private _fetchers: IGameFetcher[];
    private _resolver: IProviderResolver;
    private _reducer: IDataReducer;
    private _storageManager: IDataStorageManager;

    constructor(

        fetchers: IGameFetcher[],
        resolver: IProviderResolver,
        reducer: IDataReducer,
        storageManager: IDataStorageManager

    ) {
        // TODO: fetch in batch?
        this._fetchers = fetchers;
        this._resolver = resolver;
        this._reducer = reducer;
        this._storageManager = storageManager;
    }

    private async fetchData(): Promise<any[]> {

        const data: any[] = [];

        for (const fetcher of this._fetchers) {

            data.push(...await fetcher.fetch());
        }

        return data;
    }

    private async fetchDataById(id: number): Promise<any[]> {

        const data: any[] = [];

        for (const fetcher of this._fetchers) {

            const provider = fetcher.name;
            const gameId = await this._resolver.resolveGameId(provider, id);

            data.push(...await fetcher.fetchById(gameId));
        }

        return data;
    }

    private sortByViews(data: any[]): any[] {

        const key = 'view_count';

        return data.slice().sort((a, b) => +b[key] - +a[key]);
    }

    public async collect(): Promise<void> {

        const data = await this.fetchData();
        const reduced = this._reducer.reduce(data);
        const collectable = this.sortByViews(reduced);

        const collected = await this._storageManager.addToPersistent(collectable);
        await this._storageManager.addToMemory(collected);

        console.log(collected);
    }

    public async collectById(id: number): Promise<void> {

        const data = await this.fetchDataById(id);
        const reduced = this._reducer.reduce(data);
        const collectable = reduced.slice(0, 1);

        const collected = await this._storageManager.addToPersistent(collectable);
        await this._storageManager.addToMemory(collected);

        console.log(collected);
    }
}
