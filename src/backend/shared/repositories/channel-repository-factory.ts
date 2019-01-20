import models from '../models';

import ChannelRepository from './channel-repository';
import IChannelRepository from './channel-repository.interface';
import SequentialIdRepositoryFactory from './sequential-id-repository-factory';

export default class ChannelRepositoryFactory extends SequentialIdRepositoryFactory<IChannelRepository> {

    public createRepository(): IChannelRepository {

        const model = models.Channel;
        const documentGenerator = this.createDocumentGenerator(model);

        return new ChannelRepository(documentGenerator);
    }
}
