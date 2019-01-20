import IDataReducer from '../services/IDataReducer.interface';
import IDataStorageManager from '../services/IDataStorageManager.interface';
import IFetcher from '../services/IFetcher.interface';
import IFetcherFactory from '../services/IFetcherFactory.interface';
import IProviderResolver from '../../shared/services/IProviderResolver.interface';

export default abstract class DataCollectorFactory<T extends IFetcher> {

    protected _fetcherFactory: IFetcherFactory<T>;
    protected _resolver: IProviderResolver;
    protected _reducer: IDataReducer;
    protected _storageManager: IDataStorageManager;

    private _providers = ['mixer'];

    constructor(

        fetcherFactory: IFetcherFactory<T>,
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
