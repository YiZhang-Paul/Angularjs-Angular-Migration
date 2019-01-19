import http from 'axios';

import IProviderRepository from '../../shared/repositories/IProviderRepository.interface';

import IFetcher from './IFetcher.interface';

type ProviderDetail = { id: number; urls: any };

export default abstract class Fetcher implements IFetcher {

    protected readonly _providerName: string;
    protected readonly _apiName: string;
    protected readonly _repository: IProviderRepository;

    protected _provider: ProviderDetail | null = null;

    constructor(providerName: string, apiName: string, repository: IProviderRepository) {

        this._providerName = providerName;
        this._apiName = apiName;
        this._repository = repository;
        this.setProvider(providerName, repository);
    }

    protected async setProvider(name: string, repository: IProviderRepository): Promise<void> {

        const provider = await repository.findByName(name);

        if (!provider) {

            return;
        }

        const details = provider.toObject();

        this._provider = {

            id: +details['id'],
            urls: details['urls']
        };
    }

    protected async tryFetchData(url: string): Promise<any[]> {

        try {

            const response = await http.get(url);

            return response.data;
        }
        catch (error) {

            return new Array<any>();
        }
    }

    protected attachProviderId(data: any[], id: number): any[] {

        return data.map(_ => {

            _['provider_id'] = id;

            return _;
        });
    }

    protected async fetchData(query: string): Promise<any[]> {

        if (!this._provider) {

            await this.setProvider(this._providerName, this._repository);
        }

        if (!this._provider || !this._provider.urls[this._apiName]) {

            return new Array<any>();
        }

        const api = this._provider.urls[this._apiName];
        const data = await this.tryFetchData(`${api}${query}`);

        return this.attachProviderId(data, this._provider.id);
    }

    public abstract fetch(): Promise<any[]>;
}
