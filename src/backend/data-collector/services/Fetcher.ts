import http from 'axios';

import IProviderRepository from '../../shared/repositories/IProviderRepository.interface';

import IFetcher from './IFetcher.interface';

type ProviderDetail = { id: string; api: string };

export default abstract class Fetcher implements IFetcher {

    protected _providerName = '';
    protected _apiName = '';
    protected _repository: IProviderRepository;

    constructor(repository: IProviderRepository) {

        this._repository = repository;
    }

    protected async getProvider(): Promise<ProviderDetail | null> {

        const provider = await this._repository.findByName(this._providerName);

        if (!provider) {

            return null;
        }

        return {

            id: provider.toObject()['id'],
            api: provider.toObject()['urls'][this._apiName]
        };
    }

    protected attachId(data: any[], id: string): any[] {

        return data.map(_ => {

            _.provider_id = id;

            return _;
        });
    }

    protected async tryFetchData(url: string): Promise<any[]> {

        try {

            const response = await http.get(url);

            return response.data;

        } catch (error) {

            return new Array<any>();
        }
    }

    protected async fetchData(query: string): Promise<any[]> {

        const provider = await this.getProvider();

        if (!provider) {

            return new Array<any>();
        }

        const data = await this.tryFetchData(`${provider.api}${query}`);

        return this.attachId(data, provider.id);
    }

    public abstract fetch(): Promise<any[]>;
}
