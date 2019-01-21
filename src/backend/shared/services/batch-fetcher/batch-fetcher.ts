import IDataFetcher from '../data-fetcher/data-fetcher.interface';
import IProviderResolver from '../provider-resolver/provider-resolver.interface';

import IBatchFetcher from './batch-fetcher.interface';

export default class BatchFetcher<T extends IDataFetcher> implements IBatchFetcher {

    protected _fetchers: T[];
    protected _resolver: IProviderResolver;
    protected _resolvedIds: Map<string, number>;

    constructor(fetchers: T[], resolver: IProviderResolver) {

        this._fetchers = fetchers;
        this._resolver = resolver;
        this._resolvedIds = new Map<string, number>();
    }

    protected getResolveKey(fetcher: T, id: number): string {

        return `${fetcher.name}<|>${id}`;
    }

    protected getResolvedId(fetcher: T, id: number): number | undefined {

        const key = this.getResolveKey(fetcher, id);

        return this._resolvedIds.get(key);
    }

    protected async updateResolvedIds(id: number): Promise<void> {

        for (const fetcher of this._fetchers) {

            const key = this.getResolveKey(fetcher, id);

            if (!this._resolvedIds.has(key)) {

                const provider = fetcher.name;
                const resolved = this._resolver.resolveGameId(provider, id);
                this._resolvedIds.set(key, await resolved);
            }
        }
    }

    public async batchFetch(): Promise<any[]> {

        const data: any[] = [];

        for (const fetcher of this._fetchers) {

            data.push(...await fetcher.fetch());
        }

        return data;
    }

    public async batchFetchByGameId(id: number): Promise<any[]> {

        await this.updateResolvedIds(id);

        const data: any[] = [];

        for (const fetcher of this._fetchers) {

            const resolved = this.getResolvedId(fetcher, id);

            if (resolved) {

                data.push(...await fetcher.fetchById(resolved));
            }
        }

        return data;
    }
}
