import AllPrivilegeMongoDbRepository from './AllPrivilegeMongoDbRepository';
import IChannelRepository from './IChannelRepository.interface';

export default class ChannelRepository extends AllPrivilegeMongoDbRepository implements IChannelRepository { }
