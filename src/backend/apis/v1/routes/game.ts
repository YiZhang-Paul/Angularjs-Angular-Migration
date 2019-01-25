import { Request, Response, Router } from 'express';

import services from '../services';

const router = Router();
const service = services.game;

const root = '/';
const gameById = '/:id';
const channelsByGameId = `${gameById}/channels`;

router.get(root, async (_: Request, res: Response) => {

    res.status(200).send(await service.getGames());
});
// TODO: add controllers later
router.get(gameById, async (req: Request, res: Response) => {

    const id = +req.params.id;
    const game = await service.getGameById(id);

    if (!game) {

        return res.sendStatus(404);
    }

    res.status(200).send([game]);
});

router.get(channelsByGameId, async (req: Request, res: Response) => {

    const id = +req.params.id;
    const channels = await service.getChannelsByGameId(id);

    if (!channels.length) {

        return res.sendStatus(404);
    }

    res.status(200).send(channels);
});

router.all(root, (_: Request, res: Response) => res.sendStatus(405));
router.all(gameById, (_: Request, res: Response) => res.sendStatus(405));
router.all(channelsByGameId, (_: Request, res: Response) => res.sendStatus(405));

export default router;
