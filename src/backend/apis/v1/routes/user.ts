import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (_: Request, res: Response) => res.sendStatus(200));

router.post('/', (_: Request, res: Response) => res.sendStatus(201));

export default router;
