import { cache } from '../../redis-database';

import IMemoryDataStore from './IMemoryDataStore.interface';

export default class MemoryDataStore implements IMemoryDataStore {

    public async set(data: any[], key: string): Promise<any[]> {

        const json = JSON.stringify(data);

        cache.set(key, json, error => {

            if (error) {

                throw error;
            }
        });

        return data;
    }

    public async get(key: string): Promise<any[]> {

        return new Promise<any>((resolve, reject) => {

            cache.get(key, (error, data) => {

                if (error) {

                    reject(error);
                }

                resolve(JSON.parse(data));
            });
        });
    }
}
