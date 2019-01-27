import AllPrivilegeMongoDbRepository from '../all-privilege-mongodb-repository/all-privilege-mongodb-repository';

import IViewHistoryRepository from './view-history-repository.interface';

export default class ViewHistoryRepository extends AllPrivilegeMongoDbRepository implements IViewHistoryRepository { }
