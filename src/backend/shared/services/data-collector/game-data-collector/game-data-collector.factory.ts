import BatchFetcher from '../../batch-fetcher/batch-fetcher';
import DataCollectorFactory from '../data-collector.factory';
import GameDataAdapter from '../../data-adapter/game-data-adapter/game-data-adapter';
import GameDataReducer from '../../data-reducer/game-data-reducer/game-data-reducer';
import GameDataStorageManager from '../../data-storage-manager/game-data-storage-manager/game-data-storage-manager';
import GameFetcherFactory from '../../data-fetcher/game-fetcher/game-fetcher.factory';
import IGameFetcher from '../../data-fetcher/game-fetcher/game-fetcher.interface';
import GameRepositoryFactory from '../../../repositories/game-repository/game-repository.factory';
import MemoryDataStore from '../../data-store/memory-data-store/memory-data-store';
import PersistentDataStore from '../../data-store/persistent-data-store/persistent-data-store';
import ProviderResolverFactory from '../../provider-resolver/provider-resolver.factory';

import GameDataCollector from './game-data-collector';
import IGameDataCollectorFactory from './game-data-collector.factory.interface';
import IGameDataCollector from './game-data-collector.interface';

export class GameDataCollectorFactory extends DataCollectorFactory<IGameFetcher> implements IGameDataCollectorFactory {

    constructor() {

        const adapter = new GameDataAdapter();
        const memoryStore = new MemoryDataStore();
        const repository = new GameRepositoryFactory().createRepository();
        const persistentStore = new PersistentDataStore(repository);

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
