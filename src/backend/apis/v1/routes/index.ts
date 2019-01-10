import { Request, Response, Router } from 'express';

import userRouter from './user';

const router = Router();

router.get('/', (_: Request, res: Response) => res.sendStatus(200));

export default {

    index: router,
    user: userRouter
};
