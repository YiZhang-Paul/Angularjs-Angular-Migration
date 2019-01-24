import AllPrivilegeMongoDbRepository from '../all-privilege-mongodb-repository/all-privilege-mongodb-repository';

import IAccountRepository from './account-repository.interface';

export default class AccountRepository extends AllPrivilegeMongoDbRepository implements IAccountRepository { }
