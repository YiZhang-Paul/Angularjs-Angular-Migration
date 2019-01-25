import { Document } from 'mongoose';

import IGameRepository from '../../../repositories/game-repository/game-repository.interface';
import IKeyRemover from '../../key-remover/key-remover.interface';

import IPersistentDataStore from './persistent-data-store.interface';

export default class PersistentDataStore implements IPersistentDataStore {

    private readonly _keys = 'search_api_keys';
    private _repository: IGameRepository;
    private _keyRemover: IKeyRemover;

    constructor(repository: IGameRepository, keyRemover: IKeyRemover) {

        this._repository = repository;
        this._keyRemover = keyRemover;
    }

    private hasDuplicate(object: any, objects: any[], key: string): boolean {

        return objects.some(_ => _[key] === object[key]);
    }

    private syncData(outdated: any, updated: any): any {

        const synced = outdated;

        synced.id = +updated.id;
        synced[this._keys] = updated[this._keys].slice();

        return synced;
    }

    private async updateData(document: Document, data: any): Promise<any> {

        const updateData = document.toObject();
        const keys = updateData[this._keys];
        const name = updateData.name;

        for (const key of data[this._keys]) {

            if (!this.hasDuplicate(key, keys, 'provider_id')) {

                keys.push(key);
            }
        }

        await this._repository.updateOne(updateData, { name });

        return this.syncData(data, updateData);
    }

    private async insertData(data: any): Promise<any> {

        const result = await this._repository.insertOne(data);

        if (result) {

            data.id = +result.toObject().id;
        }

        return data;
    }

    private toObjects(documents: Document[]): any[] {

        const objects = documents.map(_ => _.toObject());

        return this._keyRemover.remove(objects, ['_id', '__v']);
    }

    public async set(data: any[]): Promise<any[]> {

        const results: any[] = [];

        for (const _ of data) {

            const game = await this._repository.findByName(_.name);

            const result = game ?
                await this.updateData(game, _) :
                await this.insertData(_);

            if (result) {

                results.push(result);
            }
        }

        return this._keyRemover.remove(results, ['_id', '__v']);
    }

    public async get(): Promise<any[]> {

        const documents = await this._repository.find();

        return this.toObjects(documents);
    }
}
