import AllPrivilegeMongoDbRepository from './AllPrivilegeMongoDbRepository';
import IProviderRepository from './IProviderRepository.interface';

export default class ProviderRepository extends AllPrivilegeMongoDbRepository implements IProviderRepository {

    public async findIdByName(name: string): Promise<number> {

        const document = await this.findOne({ name });

        return document ? +document.toObject()['id'] : -1;
    }
    public async findApisByName(name: string): Promise<any> {

        const document = await this.findOne({ name });

        return document ? document.toObject()['urls'] : null;
    }
}
