import { Request, Response, Router } from 'express';

import authenticateRouter from './authenticate';
import bookmarkRouter from './bookmark';
import channelRouter from './channel';
import gameRouter from './game';
import userRouter from './user';
import viewHistoryRouter from './view-history';

const router = Router();

router.get('/', (_: Request, res: Response) => res.sendStatus(200));

export default {

    index: router,
    authenticate: authenticateRouter,
    bookmark: bookmarkRouter,
    channel: channelRouter,
    game: gameRouter,
    user: userRouter,
    viewHistory: viewHistoryRouter
};
