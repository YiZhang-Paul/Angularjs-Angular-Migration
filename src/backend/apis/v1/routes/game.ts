import { Request, Response, Router } from 'express';

import controllers from '../controllers';

const router = Router();
const controller = controllers.game;

router.get('/', async (_: Request, res: Response) => {

    res.status(200).send(await controller.getGames());
});

router.get('/:id', async (req: Request, res: Response) => {

    const id = +req.params['id'];
    const game = await controller.getGameById(id);

    if (!game) {

        return res.sendStatus(404);
    }

    res.status(200).send([game]);
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));
router.all('/:id', (_: Request, res: Response) => res.sendStatus(405));

export default router;
