import GameDataCollectorFactory from '../factories/GameDataCollectorFactory';
import GameRepositoryFactory from '../../shared/repositories/GameRepositoryFactory';
import IProviderResolver from '../../shared/services/IProviderResolver.interface';
import ProviderResolverFactory from '../../shared/services/ProviderResolverFactory';
import ProviderRepositoryFactory from '../../shared/repositories/ProviderRepositoryFactory';

import GameDataAdapter from './GameDataAdapter';
import GameDataReducer from './GameDataReducer';
import GameDataStorageManager from './GameDataStorageManager';
import IDataReducer from './IDataReducer.interface';
import IDataStorageManager from './IDataStorageManager.interface';
import IGameDataCollector from './IGameDataCollector.interface';
import IGameFetcher from './IGameFetcher.interface';
import MixerGameFetcher from './MixerGameFetcher';

export class GameDataCollector implements IGameDataCollector {

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

    // private sortByViews(data: any[]): any[] {

    //     const key = 'view_count';

    //     return data.slice().sort((a, b) => +b[key] - +a[key]);
    // }

    public async collect(): Promise<void> {

        const data = await this.fetchData();

        console.log(data);
    }

    public async collectById(id: number): Promise<void> {

        const data = await this.fetchDataById(id);

        console.log(data);
    }

    // public async collect(): Promise<void> {

    //     const reducedData = this._reducer.reduce(data);
    //     const toCollect = this.sortByViews(reducedData).slice(0, 50);

    //     const collected = await this._storageManager.addToPersistent(toCollect);
    //     await this._storageManager.addToMemory(collected);
    // }
}

export default new GameDataCollectorFactory().createGameCollector();
