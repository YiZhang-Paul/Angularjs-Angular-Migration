import GameRepositoryFactory from '../../shared/repositories/GameRepositoryFactory';
import ProviderRepositoryFactory from '../../shared/repositories/ProviderRepositoryFactory';

import GameDataAdapter from './GameDataAdapter';
import GameDataReducer from './GameDataReducer';
import GameDataStorageManager from './GameDataStorageManager';
import ICollector from './ICollector.interface';
import IDataReducer from './IDataReducer.interface';
import IDataStorageManager from './IDataStorageManager.interface';
import IGameFetcher from './IGameFetcher.interface';
import MixerGameFetcher from './MixerGameFetcher';

export class GameDataCollector implements ICollector {

    private _fetchers: IGameFetcher[];
    private _reducer: IDataReducer;
    private _storageManager: IDataStorageManager;

    constructor(

        fetchers: IGameFetcher[],
        reducer: IDataReducer,
        storageManager: IDataStorageManager

    ) {

        this._fetchers = fetchers;
        this._reducer = reducer;
        this._storageManager = storageManager;
    }

    protected async fetchGames(): Promise<any[]> {

        const games: any[] = [];

        for (const fetcher of this._fetchers) {

            games.push(...await fetcher.fetch());
        }

        return games;
    }

    private sortByViewCount(data: any[]): any[] {

        const key = 'view_count';

        return data.slice().sort((a, b) => +b[key] - +a[key]);
    }

    public async collect(): Promise<void> {

        const data = await this.fetchGames();
        const reducedData = this._reducer.reduce(data);
        const toCollect = this.sortByViewCount(reducedData).slice(0, 50);

        const collected = await this._storageManager.addToPersistent(toCollect);
        await this._storageManager.addToMemory(collected);

        const result = await this._storageManager.getFromMemory();
        console.log(result);
    }
}
// TODO: wrap in factory class
const providerRepository = new ProviderRepositoryFactory().createRepository();
const mixerFetcher = new MixerGameFetcher(providerRepository);
const adapter = new GameDataAdapter();
const reducer = new GameDataReducer(adapter);
const gameRepository = new GameRepositoryFactory().createRepository();
const storageManager = new GameDataStorageManager(gameRepository);

export default new GameDataCollector([mixerFetcher], reducer, storageManager);
