import IDataFetcherFactory from '../../shared/services/data-fetcher/data-fetcher.factory.interface';
import IDataFetcher from '../../shared/services/data-fetcher/data-fetcher.interface';
import IDataReducer from '../services/data-reducer.interface';
import IDataStorageManager from '../services/data-storage-manager.interface';
import IProviderResolver from '../../shared/services/provider-resolver/provider-resolver.interface';

export default abstract class DataCollectorFactory<T extends IDataFetcher> {

    protected _fetcherFactory: IDataFetcherFactory<T>;
    protected _resolver: IProviderResolver;
    protected _reducer: IDataReducer;
    protected _storageManager: IDataStorageManager;

    private _providers = ['mixer'];

    constructor(

        fetcherFactory: IDataFetcherFactory<T>,
        resolver: IProviderResolver,
        reducer: IDataReducer,
        storageManager: IDataStorageManager

    ) {

        this._fetcherFactory = fetcherFactory;
        this._resolver = resolver;
        this._reducer = reducer;
        this._storageManager = storageManager;
    }

    protected async createFetchers(): Promise<T[]> {

        const fetchers = this._providers.map(_ => {

            return this._fetcherFactory.createFetcher(_);
        });

        return Promise.all(fetchers);
    }
}
