import AllPrivilegeMongoDbRepository from './AllPrivilegeMongoDbRepository';
import IProviderRepository from './IProviderRepository.interface';

export default class ProviderRepository extends AllPrivilegeMongoDbRepository implements IProviderRepository {

    public async findApi(name: string, type: string): Promise<string | null> {

        const provider = await this.findOne({ name });

        if (!provider) {

            return null;
        }

        return provider.toObject()['urls'][type];
    }
}
