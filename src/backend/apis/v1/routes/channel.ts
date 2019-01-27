import { Request, Response, Router } from 'express';

import services from '../services';

const router = Router();
const service = services.channel;

router.get('/', async (_: Request, res: Response) => {

    res.status(200).send(await service.getChannels());
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));

export default router;
