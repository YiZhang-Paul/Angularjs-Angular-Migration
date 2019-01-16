import http from 'axios';

import IProviderRepository from '../../shared/repositories/IProviderRepository.interface';

import IFetcher from './IFetcher.interface';

export default abstract class Fetcher implements IFetcher {

    protected _provider = '';
    protected _apiType = '';
    protected _repository: IProviderRepository;

    constructor(repository: IProviderRepository) {

        this._repository = repository;
    }

    protected async getApi(): Promise<string | null> {

        const provider = this._provider.trim();
        const apiType = this._apiType.trim();

        return this._repository.findApi(provider, apiType);
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

        const api = await this.getApi();

        if (!api) {

            return new Array<any>();
        }

        return this.tryFetchData(`${api}${query}`);
    }

    public abstract fetch(): Promise<any[]>;
}
