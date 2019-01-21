import { cache } from '../../../../redis-database';

import IMemoryDataStore from './memory-data-store.interface';

export default class MemoryDataStore implements IMemoryDataStore {

    public async set(data: any[], key: string, expire?: number): Promise<any[]> {

        const json = JSON.stringify(data);

        cache.set(key, json, error => {

            if (error) {

                throw error;
            }
        });

        if (expire) {

            cache.expire(key, expire);
        }

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
