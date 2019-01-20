import { Request, Response, Router } from 'express';

import gameRouter from './game';
import userRouter from './user';

const router = Router();

router.get('/', (_: Request, res: Response) => res.sendStatus(200));

export default {

    index: router,
    game: gameRouter,
    user: userRouter
};
