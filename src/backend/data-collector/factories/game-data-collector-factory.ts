import BatchFetcher from '../services/batch-fetcher';
import GameDataAdapter from '../services/game-data-adapter';
import GameDataCollector from '../services/game-data-collector';
import IGameDataCollector from '../services/game-data-collector.interface';
import GameDataReducer from '../services/game-data-reducer';
import GameDataStorageManager from '../services/game-data-storage-manager';
import GameFetcherFactory from '../services/game-fetcher-factory';
import IGameFetcher from '../services/game-fetcher.interface';
import GameRepositoryFactory from '../../shared/repositories/game-repository/game-repository.factory';
import MemoryDataStore from '../services/memory-data-store';
import MongoDbGameDataStore from '../services/mongodb-game-data-store';
import ProviderResolverFactory from '../../shared/services/provider-resolver/provider-resolver.factory';

import DataCollectorFactory from './data-collector-factory';
import IGameDataCollectorFactory from './game-data-collector-factory.interface';

export class GameDataCollectorFactory extends DataCollectorFactory<IGameFetcher> implements IGameDataCollectorFactory {

    constructor() {

        const adapter = new GameDataAdapter();
        const memoryStore = new MemoryDataStore();
        const repository = new GameRepositoryFactory().createRepository();
        const persistentStore = new MongoDbGameDataStore(repository);

        super(

            new GameFetcherFactory(),
            new ProviderResolverFactory().createResolver(),
            new GameDataReducer(adapter),
            new GameDataStorageManager(memoryStore, persistentStore)
        );
    }

    public async createGameCollector(): Promise<IGameDataCollector> {

        const fetchers = await this.createFetchers();
        const batchFetcher = new BatchFetcher(fetchers, this._resolver);

        return new GameDataCollector(

            batchFetcher,
            this._reducer,
            this._storageManager
        );
    }
}

export default new GameDataCollectorFactory().createGameCollector();
