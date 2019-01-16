import http from 'axios';
import { Document } from 'mongoose';

import models from '../../shared/models';

import IFetcher from './IFetcher.interface';

export default abstract class Fetcher implements IFetcher {

    protected _provider: Promise<Document | null>;

    constructor() {
        // TODO: create repository
        this._provider = models.Provider.findOne({ name: 'mixer' }).then();
    }
    // TODO: this should be a repository method
    protected async getApi(name: string): Promise<string | null> {

        const provider = await this._provider;

        if (!provider) {

            return null;
        }

        return provider.toObject()['urls'][name];
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
