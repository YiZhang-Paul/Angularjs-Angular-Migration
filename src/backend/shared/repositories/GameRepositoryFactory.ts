import models from '../models';

import GameRepository from './GameRepository';
import IGameRepository from './IGameRepository.interface';
import SequentialIdRepositoryFactory from './SequentialIdRepositoryFactory';

export default class GameRepositoryFactory extends SequentialIdRepositoryFactory<IGameRepository> {

    public createRepository(): IGameRepository {

        const model = models.Game;
        const documentFactory = this.createDocumentFactory(model);

        return new GameRepository(documentFactory);
    }
}
