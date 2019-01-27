import AllPrivilegeMongoDbRepository from '../all-privilege-mongodb-repository/all-privilege-mongodb-repository';

import IBookmarkRepository from './bookmark-repository.interface';

export default class BookmarkRepository extends AllPrivilegeMongoDbRepository implements IBookmarkRepository { }
