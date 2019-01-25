import http from 'axios';

import IDataFetcher from './data-fetcher.interface';

type ProviderDetail = { id: number; name: string; api: string };

export default abstract class DataFetcher implements IDataFetcher {

    public readonly id: number;
    public readonly name: string;
    public readonly api: string;

    constructor(providerDetail: ProviderDetail) {

        this.id = providerDetail.id;
        this.name = providerDetail.name;
        this.api = providerDetail.api;
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

            _.provider_id = this.id;

            return _;
        });
    }

    protected async fetchData(query: string): Promise<any[]> {

        const data = await this.tryFetch(`${this.api}${query}`);

        return this.attachProviderId(data);
    }

    public abstract fetch(): Promise<any[]>;

    public abstract fetchById(id: number): Promise<any[]>;
}
