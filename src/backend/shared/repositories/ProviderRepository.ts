import { Document } from 'mongoose';

import AllPrivilegeMongoDbRepository from './AllPrivilegeMongoDbRepository';
import IProviderRepository from './IProviderRepository.interface';

export default class ProviderRepository extends AllPrivilegeMongoDbRepository implements IProviderRepository {

    public async findByName(name: string): Promise<Document | null> {

        return this.findOne({ name });
    }
}
