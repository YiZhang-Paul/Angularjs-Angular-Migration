import { Request, Response, Router } from 'express';

import gameDataCollectorPromise from '../../../data-collector/factories/game-data-collector-factory';
import GameDataStorageManager from '../../../data-collector/services/game-data-storage-manager';
import GameRepositoryFactory from '../../../shared/repositories/game-repository-factory';
import MemoryDataStore from '../../../data-collector/services/memory-data-store';
import MongoDbGameDataStore from '../../../data-collector/services/mongodb-game-data-store';

const router = Router();
const gameRepository = new GameRepositoryFactory().createRepository();
const memoryStore = new MemoryDataStore();
const persistentStore = new MongoDbGameDataStore(gameRepository);
const storageManager = new GameDataStorageManager(memoryStore, persistentStore);

router.get('/', async (_: Request, res: Response) => {
    // TODO: retrieve from game data collector instead
    res.status(200).send(await storageManager.getFromMemory());
});
// TODO: wrap in service
router.get('/:id', async (req: Request, res: Response) => {

    const id = +req.params['id'];
    const games = await storageManager.getFromMemory();
    let result = games.find(_ => _['id'] === id);

    if (result) {

        return res.status(200).send([result]);
    }

    const gameDataCollector = await gameDataCollectorPromise;
    await gameDataCollector.collectById(id);
    result = await storageManager.getFromMemory(`games/${id}`);

    if (!result.length) {

        return res.sendStatus(404);
    }

    res.status(200).send(result);
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));
router.all('/:id', (_: Request, res: Response) => res.sendStatus(405));

export default router;
