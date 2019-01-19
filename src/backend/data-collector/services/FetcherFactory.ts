import IProviderResolver from '../../shared/services/IProviderResolver.interface';

import IFetcher from './IFetcher.interface';
import IFetcherFactory from './IFetcherFactory.interface';

type ProviderDetail = { id: number; name: string; api: string };

export default abstract class FetcherFactory<T extends IFetcher> implements IFetcherFactory<T> {

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
