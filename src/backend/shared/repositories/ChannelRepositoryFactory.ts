import models from '../models';

import ChannelRepository from './ChannelRepository';
import IChannelRepository from './IChannelRepository.interface';
import SequentialIdRepositoryFactory from './SequentialIdRepositoryFactory';

export default class ChannelRepositoryFactory extends SequentialIdRepositoryFactory<IChannelRepository> {

    public createRepository(): IChannelRepository {

        const model = models.Channel;
        const documentFactory = this.createDocumentFactory(model);

        return new ChannelRepository(documentFactory);
    }
}
