import { Document } from 'mongoose';

import { redis } from '../../database';
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

    private async updatePersistent(document: Document, data: any): Promise<Document | null> {

        const toUpdate = document.toObject();
        const keyField = 'search_api_keys';
        const name = toUpdate['name'];

        for (const key of data[keyField]) {

            const keys = toUpdate[keyField];

            if (!this.isDuplicate(key, keys, 'provider_id')) {

                keys.push(key);
            }
        }

        return this._repository.updateOne(toUpdate, { name });
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
                await this._repository.insertOne(_);

            if (result) {

                added.push(result);
            }
        }

        return this.toObjects(added, ['_id', '__v']);
    }

    public async addToMemory(data: any[]): Promise<any[]> {

        redis.add(this._cacheKey, JSON.stringify(data), error => {

            if (error) {

                console.log(error);
            }
        });

        return data;
    }

    public async getFromPersistent(): Promise<any[]> {

        return this._repository.find();
    }

    public async getFromMemory(): Promise<any[]> {

        return new Promise<any>((resolve, reject) => {

            redis.get(this._cacheKey, (error, data) => {

                if (error) {

                    reject(error);
                }

                resolve(JSON.parse(data[0].body));
            });
        });
    }
}
