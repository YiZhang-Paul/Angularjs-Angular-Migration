import { Request, Response, Router } from 'express';

import GameDataStorageManager from '../../../data-collector/services/GameDataStorageManager';
import GameRepositoryFactory from '../../../shared/repositories/GameRepositoryFactory';

const router = Router();
const repository = new GameRepositoryFactory().createRepository();
const storageManager = new GameDataStorageManager(repository);

router.get('/', async (_: Request, res: Response) => {

    res.status(200).send(await storageManager.getFromMemory());
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));

export default router;
