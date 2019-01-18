import { Document } from 'mongoose';

import AllPrivilegeMongoDbRepository from './AllPrivilegeMongoDbRepository';
import IGameRepository from './IGameRepository.interface';

export default class GameRepository extends AllPrivilegeMongoDbRepository implements IGameRepository {

    public async findByName(name: string): Promise<Document | null> {

        return this.findOne({ name });
    }
}
