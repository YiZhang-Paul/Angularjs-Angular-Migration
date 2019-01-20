import { Request, Response, Router } from 'express';

import gameDataCollectorPromise from '../../../shared/services/data-collector/game-data-collector/game-data-collector.factory';
import GameDataStorageManager from '../../../shared/services/data-storage-manager/game-data-storage-manager/game-data-storage-manager';
import GameRepositoryFactory from '../../../shared/repositories/game-repository/game-repository.factory';
import MemoryDataStore from '../../../shared/services/data-store/memory-data-store/memory-data-store';
import PersistentDataStore from '../../../shared/services/data-store/persistent-data-store/persistent-data-store';

const router = Router();
const gameRepository = new GameRepositoryFactory().createRepository();
const memoryStore = new MemoryDataStore();
const persistentStore = new PersistentDataStore(gameRepository);
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
