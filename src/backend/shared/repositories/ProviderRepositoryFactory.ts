import models from '../models';

import IProviderRepository from './IProviderRepository.interface';
import ProviderRepository from './ProviderRepository';
import SequentialIdRepositoryFactory from './SequentialIdRepositoryFactory';

export default class ProviderRepositoryFactory extends SequentialIdRepositoryFactory<IProviderRepository> {

    public createRepository(): IProviderRepository {

        const model = models.Provider;
        const documentFactory = this.createDocumentFactory(model);

        return new ProviderRepository(documentFactory);
    }
}
