import { Document } from 'mongoose';

import AllPrivilegeMongoDbRepository from './AllPrivilegeMongoDbRepository';
import IGameRepository from './IGameRepository.interface';

export default class GameRepository extends AllPrivilegeMongoDbRepository implements IGameRepository {

    public async findByName(name: string): Promise<Document | null> {

        return this.findOne({ name });
    }

    public async findProvidersById(id: number): Promise<any[]> {

        const document = await this.findOne({ id });

        if (!document) {

            return new Array<any>();
        }

        return document.toObject()['search_api_keys'];
    }
}
