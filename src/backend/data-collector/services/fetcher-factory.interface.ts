import IFetcher from './fetcher.interface';

export default interface IFetcherFactory<T extends IFetcher> {

    createFetcher(provider: string): Promise<T>;
}
