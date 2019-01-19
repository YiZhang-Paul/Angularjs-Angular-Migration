import { Document } from 'mongoose';

import { cache } from '../../database';
import IGameRepository from '../../shared/repositories/IGameRepository.interface';

import IDataStorageManager from './IDataStorageManager.interface';
// TODO: extract to memory/persistent manager?
export default class GameDataStorageManager implements IDataStorageManager {

    private readonly _cacheKey = 'games';
    private _repository: IGameRepository;

    constructor(repository: IGameRepository) {

        this._repository = repository;
    }

    private isDuplicate(object: any, objects: any[], key: string): boolean {

        return objects.some(_ => _[key] === object[key]);
    }

    private addUpdatedData(data: any, updated: any): any {

        data['id'] = updated['id'];
        data['search_api_keys'] = updated['search_api_keys'].slice();

        return data;
    }

    private async updatePersistent(document: Document, data: any): Promise<any> {

        const newData = document.toObject();
        const keyField = 'search_api_keys';
        const name = newData['name'];

        for (const key of data[keyField]) {

            const keys = newData[keyField];

            if (!this.isDuplicate(key, keys, 'provider_id')) {

                keys.push(key);
            }
        }

        await this._repository.updateOne(newData, { name });

        return this.addUpdatedData(data, newData);
    }

    private async insertPersistent(data: any): Promise<any> {

        const result = await this._repository.insertOne(data);

        if (result) {

            data['id'] = result.toObject()['id'];
        }

        return data;
    }

    private toObjects(documents: Document[], excludes: string[] = []): any[] {

        return documents.map(document => {

            const data = document.toObject();

            const object = JSON.stringify(data, (key, value) => {

                return excludes.includes(key) ? undefined : value;
            });

            return JSON.parse(object);
        });
    }

    public async addToPersistent(data: any[]): Promise<any[]> {

        const added: any[] = [];

        for (const _ of data) {

            const game = await this._repository.findByName(_['name']);

            const result = game ?
                await this.updatePersistent(game, _) :
                await this.insertPersistent(_);

            if (result) {

                added.push(result);
            }
        }

        return added;
    }

    public async addToMemory(data: any[]): Promise<any[]> {

        const jsonData = JSON.stringify(data);

        cache.set(this._cacheKey, jsonData, error => {

            if (error) {

                throw error;
            }
        });

        return data;
    }

    public async getFromPersistent(): Promise<any[]> {

        const documents = await this._repository.find();

        return this.toObjects(documents, ['_id', '__v']);
    }

    public async getFromMemory(): Promise<any[]> {

        return new Promise<any>((resolve, reject) => {

            cache.get(this._cacheKey, (error, data) => {

                if (error) {

                    reject(error);
                }

                resolve(JSON.parse(data));
            });
        });
    }
}
