import { Document } from 'mongoose';

import AllPrivilegeMongoDbRepository from '../all-privilege-mongodb-repository/all-privilege-mongodb-repository';

import IUserRepository from './user-repository.interface';

export default class UserRepository extends AllPrivilegeMongoDbRepository implements IUserRepository {

    public async findByAccountId(id: number): Promise<Document | null> {

        return this.findOne({ account_id: id });
    }
}
