import models from '../../models';
import SequentialIdRepositoryFactory from '../sequential-id-repository.factory';

import UserRepository from './user-repository';
import IUserRepository from './user-repository.interface';

export default class UserRepositoryFactory extends SequentialIdRepositoryFactory<IUserRepository> {

    public createRepository(): IUserRepository {

        const model = models.User;
        const documentGenerator = this.createDocumentGenerator(model);

        return new UserRepository(documentGenerator);
    }
}
