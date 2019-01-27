import models from '../../models';
import SequentialIdRepositoryFactory from '../sequential-id-repository.factory';

import ViewHistoryRepository from './view-history-repository';
import IViewHistoryRepository from './view-history-repository.interface';

export default class ViewHistoryRepositoryFactory extends SequentialIdRepositoryFactory<IViewHistoryRepository> {

    public createRepository(): IViewHistoryRepository {

        const model = models.ViewHistory;
        const documentGenerator = this.createDocumentGenerator(model);

        return new ViewHistoryRepository(documentGenerator);
    }
}
