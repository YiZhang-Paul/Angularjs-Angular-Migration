import models from '../models';

import GameRepository from './game-repository';
import IGameRepository from './game-repository.interface';
import SequentialIdRepositoryFactory from './sequential-id-repository-factory';

export default class GameRepositoryFactory extends SequentialIdRepositoryFactory<IGameRepository> {

    public createRepository(): IGameRepository {

        const model = models.Game;
        const documentGenerator = this.createDocumentGenerator(model);

        return new GameRepository(documentGenerator);
    }
}
