import models from '../../models';
import SequentialIdRepositoryFactory from '../sequential-id-repository.factory';

import AccountRepository from './account-repository';
import IAccountRepository from './account-repository.interface';

export default class AccountRepositoryFactory extends SequentialIdRepositoryFactory<IAccountRepository> {

    public createRepository(): IAccountRepository {

        const model = models.Account;
        const documentGenerator = this.createDocumentGenerator(model);

        return new AccountRepository(documentGenerator);
    }
}
