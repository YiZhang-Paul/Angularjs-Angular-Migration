import { Request, Response, Router } from 'express';

import controllers from '../controllers';

const router = Router();
const controller = controllers.game;

const root = '/';
const gameById = '/:id';
const channelsByGameId = `${gameById}/channels`;

router.get(root, async (_: Request, res: Response) => {

    res.status(200).send(await controller.getGames());
});

router.get(gameById, async (req: Request, res: Response) => {

    const id = +req.params['id'];
    const game = await controller.getGameById(id);

    if (!game) {

        return res.sendStatus(404);
    }

    res.status(200).send([game]);
});

router.get(channelsByGameId, async (req: Request, res: Response) => {

    const id = +req.params['id'];
    const channels = await controller.getChannelsByGameId(id);

    if (!channels.length) {

        return res.sendStatus(404);
    }

    res.status(200).send(channels);
});

router.all(root, (_: Request, res: Response) => res.sendStatus(405));
router.all(gameById, (_: Request, res: Response) => res.sendStatus(405));
router.all(channelsByGameId, (_: Request, res: Response) => res.sendStatus(405));

export default router;
