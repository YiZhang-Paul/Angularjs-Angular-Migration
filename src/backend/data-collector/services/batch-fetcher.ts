import IProviderResolver from '../../shared/services/provider-resolver/provider-resolver.interface';

import IBatchFetcher from './batch-fetcher.interface';
import IFetcher from './fetcher.interface';

export default class BatchFetcher<T extends IFetcher> implements IBatchFetcher {

    private _fetchers: T[];
    private _resolver: IProviderResolver;

    constructor(fetchers: T[], resolver: IProviderResolver) {

        this._fetchers = fetchers;
        this._resolver = resolver;
    }

    public async batchFetch(): Promise<any[]> {

        const data: any[] = [];

        for (const fetcher of this._fetchers) {

            data.push(...await fetcher.fetch());
        }

        return data;
    }

    public async batchFetchById(id: number): Promise<any[]> {

        const data: any[] = [];

        for (const fetcher of this._fetchers) {

            const provider = fetcher.name;
            const gameId = await this._resolver.resolveGameId(provider, id);

            data.push(...await fetcher.fetchById(gameId));
        }

        return data;
    }
}
