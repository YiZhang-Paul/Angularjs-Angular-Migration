import http from 'axios';

import IFetcher from './IFetcher.interface';

type ProviderDetail = { id: number; name: string; api: string };

export default abstract class Fetcher implements IFetcher {

    public readonly _id: number;
    public readonly _name: string;
    public readonly _api: string;

    constructor(providerDetail: ProviderDetail) {

        this._id = providerDetail.id;
        this._name = providerDetail.name;
        this._api = providerDetail.api;
    }

    protected async tryFetch(url: string): Promise<any[]> {

        try {

            const response = await http.get(url);
            const data = response.data;

            return Array.isArray(data) ? data : [data];
        }
        catch (error) {

            return new Array<any>();
        }
    }

    protected attachProviderId(data: any[]): any[] {

        return data.map(_ => {

            _['provider_id'] = this._id;

            return _;
        });
    }

    protected async fetchData(query: string): Promise<any[]> {

        const data = await this.tryFetch(`${this._api}${query}`);

        return this.attachProviderId(data);
    }

    public abstract fetch(): Promise<any[]>;

    public abstract fetchById(id: number): Promise<any>;
}
