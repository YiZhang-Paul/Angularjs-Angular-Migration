import http from 'axios';
import { Request, Response, Router } from 'express';

import GameDataAdapter from '../../../data-collector/services/GameDataAdapter';
import GameDataReducer from '../../../data-collector/services/GameDataReducer';
import GameDataStorageManager from '../../../data-collector/services/GameDataStorageManager';
import GameRepositoryFactory from '../../../shared/repositories/GameRepositoryFactory';
import MemoryDataStore from '../../../data-collector/services/MemoryDataStore';
import MongoDbGameDataStore from '../../../data-collector/services/MongoDbGameDataStore';
import ProviderRepositoryFactory from '../../../shared/repositories/ProviderRepositoryFactory';

const router = Router();
const gameRepository = new GameRepositoryFactory().createRepository();
const providerRepository = new ProviderRepositoryFactory().createRepository();
const memoryStore = new MemoryDataStore();
const persistentStore = new MongoDbGameDataStore(gameRepository);
const storageManager = new GameDataStorageManager(memoryStore, persistentStore);
const adapter = new GameDataAdapter();
const reducer = new GameDataReducer(adapter);

router.get('/', async (_: Request, res: Response) => {

    res.status(200).send(await storageManager.getFromMemory());
});

router.get('/:id', async (req: Request, res: Response) => {

    const id = req.params['id'];
    const games = await storageManager.getFromMemory();
    const game = games.find(_ => `${_['id']}` === id);

    if (game) {

        return res.status(200).send(game);
    }

    const result = await gameRepository.findOne({ id });

    if (!result) {

        return res.sendStatus(404);
    }

    const result1: any[] = [];

    for (const _ of result.toObject()['search_api_keys']) {

        const provider = await providerRepository.findOne({ id: _['provider_id'] });

        if (!provider) {

            continue;
        }

        const api = provider.toObject()['urls']['search_game_url'];
        const result2 = await http.get(`${api}/${_['provider_game_id']}`);
        result2.data['provider_id'] = +provider.toObject()['id'];
        result1.push(result2.data);
    }

    const final = reducer.reduce(result1)[0];
    final['id'] = +result.toObject()['id'];
    console.log(final);

    const final1 = JSON.stringify(final, (key, value) => {

        if (key === '_id' || key === '__v') {

            return undefined;
        }

        return value;
    });

    res.status(200).send(JSON.parse(final1));
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));
router.all('/:id', (_: Request, res: Response) => res.sendStatus(405));

export default router;
