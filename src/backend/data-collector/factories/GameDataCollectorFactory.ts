import GameDataAdapter from '../services/GameDataAdapter';
import GameDataCollector from '../services/GameDataCollector';
import GameDataReducer from '../services/GameDataReducer';
import GameDataStorageManager from '../services/GameDataStorageManager';
import GameFetcherFactory from '../services/GameFetcherFactory';
import GameRepositoryFactory from '../../shared/repositories/GameRepositoryFactory';
import IGameDataCollector from '../services/IGameDataCollector.interface';
import IGameFetcher from '../services/IGameFetcher.interface';
import MemoryDataStore from '../services/MemoryDataStore';
import MongoDbGameDataStore from '../services/MongoDbGameDataStore';
import ProviderResolverFactory from '../../shared/services/ProviderResolverFactory';

import DataCollectorFactory from './DataCollectorFactory';
import IGameDataCollectorFactory from './IGameDataCollectorFactory.interface';

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

        return new GameDataCollector(

            await this.createFetchers(),
            this._resolver,
            this._reducer,
            this._storageManager
        );
    }
}

export default new GameDataCollectorFactory().createGameCollector();
