import models from '../models';

import ProviderRepository from './provider-repository';
import IProviderRepository from './provider-repository.interface';
import SequentialIdRepositoryFactory from './sequential-id-repository-factory';

export default class ProviderRepositoryFactory extends SequentialIdRepositoryFactory<IProviderRepository> {

    public createRepository(): IProviderRepository {

        const model = models.Provider;
        const documentGenerator = this.createDocumentGenerator(model);

        return new ProviderRepository(documentGenerator);
    }
}
