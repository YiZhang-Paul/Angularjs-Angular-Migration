import models from '../../models';
import SequentialIdRepositoryFactory from '../sequential-id-repository.factory';

import ProviderRepository from './provider-repository';
import IProviderRepository from './provider-repository.interface';

export default class ProviderRepositoryFactory extends SequentialIdRepositoryFactory<IProviderRepository> {

    public createRepository(): IProviderRepository {

        const model = models.Provider;
        const documentGenerator = this.createDocumentGenerator(model);

        return new ProviderRepository(documentGenerator);
    }
}
