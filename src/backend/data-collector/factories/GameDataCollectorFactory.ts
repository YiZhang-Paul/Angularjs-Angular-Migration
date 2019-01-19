import GameDataAdapter from '../services/GameDataAdapter';
import GameDataCollector from '../services/GameDataCollector';
import GameDataReducer from '../services/GameDataReducer';
import GameDataStorageManager from '../services/GameDataStorageManager';
import GameFetcherFactory from '../services/GameFetcherFactory';
import GameRepositoryFactory from '../../shared/repositories/GameRepositoryFactory';
import IDataReducer from '../services/IDataReducer.interface';
import IDataStorageManager from '../services/IDataStorageManager.interface';
import IGameDataCollector from '../services/IGameDataCollector.interface';
import IGameFetcherFactory from '../services/IGameFetcherFactory.interface';
import IProviderResolver from '../../shared/services/IProviderResolver.interface';
import ProviderResolverFactory from '../../shared/services/ProviderResolverFactory';

import IGameDataCollectorFactory from './IGameDataCollectorFactory.interface';

export default class GameDataCollectorFactory implements IGameDataCollectorFactory {
    // TODO: need refactor
    private _fetcherFactory: IGameFetcherFactory;
    private _resolver: IProviderResolver;
    private _reducer: IDataReducer;
    private _storageManager: IDataStorageManager;

    constructor() {

        this._fetcherFactory = new GameFetcherFactory();
        this._resolver = new ProviderResolverFactory().createResolver();
        this._reducer = new GameDataReducer(new GameDataAdapter());
        this._storageManager = new GameDataStorageManager(new GameRepositoryFactory().createRepository());
    }

    public async createGameCollector(): Promise<IGameDataCollector> {

        const providers = ['mixer'];
        const fetchers = await Promise.all(providers.map(_ => this._fetcherFactory.createFetcher(_)));

        return new GameDataCollector(fetchers, this._resolver, this._reducer, this._storageManager);
    }
}
