import IDataFetcherFactory from '../data-fetcher/data-fetcher.factory.interface';
import IDataFetcher from '../data-fetcher/data-fetcher.interface';
import IProviderResolver from '../provider-resolver/provider-resolver.interface';

export default abstract class DataCollectorFactory<T extends IDataFetcher> {

    protected _fetcherFactory: IDataFetcherFactory<T>;
    protected _resolver: IProviderResolver;
    protected _providers = ['mixer'];

    constructor(

        fetcherFactory: IDataFetcherFactory<T>,
        resolver: IProviderResolver

    ) {

        this._fetcherFactory = fetcherFactory;
        this._resolver = resolver;
    }

    protected async createFetchers(): Promise<T[]> {

        const fetchers = this._providers.map(_ => {

            return this._fetcherFactory.createFetcher(_);
        });

        return Promise.all(fetchers);
    }
}
