import IProviderResolver from '../provider-resolver/provider-resolver.interface';

import IDataFetcherFactory from './data-fetcher.factory.interface';
import IDataFetcher from './data-fetcher.interface';

type ProviderDetail = { id: number; name: string; api: string };

export default abstract class DataFetcherFactory<T extends IDataFetcher> implements IDataFetcherFactory<T> {

    protected _resolver: IProviderResolver;

    constructor(resolver: IProviderResolver) {

        this._resolver = resolver;
    }

    protected async getProvider(name: string, apiType: string): Promise<ProviderDetail> {

        const id = await this._resolver.resolveId(name);
        const url = await this._resolver.resolveApi(name, apiType);
        const api = url ? url : '';

        return { id, name, api };
    }

    public abstract createFetcher(provider: string): Promise<T>;
}
