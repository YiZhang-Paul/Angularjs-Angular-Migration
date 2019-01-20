import AllPrivilegeMongoDbRepository from '../all-privilege-mongodb-repository/all-privilege-mongodb-repository';

import IChannelRepository from './channel-repository.interface';

export default class ChannelRepository extends AllPrivilegeMongoDbRepository implements IChannelRepository { }
