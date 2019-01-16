import http from 'axios';

import IProviderRepository from '../../shared/repositories/IProviderRepository.interface';

import IFetcher from './IFetcher.interface';

export default abstract class Fetcher implements IFetcher {

    protected _repository: IProviderRepository;

    constructor(repository: IProviderRepository) {

        this._repository = repository;
    }

    protected async getApi(name: string, type: string): Promise<string | null> {

        return await this._repository.findApi(name, type);
    }

    protected async fetchData(url: string): Promise<any[]> {

        try {

            const response = await http.get(url);

            return response.data;

        } catch (error) {

            return new Array<any>();
        }
    }

    public abstract fetch(): Promise<any[]>;
}
