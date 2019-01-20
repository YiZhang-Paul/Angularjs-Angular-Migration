import IDataFetcher from './data-fetcher.interface';

export default interface IDataFetcherFactory<T extends IDataFetcher> {

    createFetcher(provider: string): Promise<T>;
}
