import { Request, Response, Router } from 'express';
import { body, check } from 'express-validator/check';

import { checkBadRequest } from '../services/express-validator-utility';
import { authenticate } from '../authentication/fake-authenticator';
import services from '../services';

const router = Router();
const service = services.viewHistory;

router.get('/', [

    authenticate('user_id'),
    check('user_id').isInt({ min: 0 }),
    checkBadRequest()

], async (req: Request, res: Response) => {

    const id = +req.body.user_id;
    const result = await service.getHistories(id);

    if (!result.length) {

        return res.sendStatus(404);
    }

    res.status(200).send(result);
});

router.post('/', [

    authenticate('user_id'),
    check('provider_id').isInt({ min: 0 }),
    check('provider_channel_id').isInt({ min: 0 }),
    check('user_id').isInt({ min: 0 }),
    check('game_id').isInt({ min: 0 }),
    body('title').optional().isLength({ max: 150 }).trim().escape(),
    body('streamer_name').not().isEmpty().isLength({ max: 50 }).trim().escape(),
    body('game_name').not().isEmpty().isLength({ max: 100 }).trim().escape(),
    body('image').optional().isURL(),
    checkBadRequest()

], async (req: Request, res: Response) => {

    const data = {

        userId: +req.body.user_id,
        providerId: +req.body.provider_id,
        providerChannelId: +req.body.provider_channel_id,
        gameId: +req.body.game_id,
        gameName: req.body.game_name,
        streamerName: req.body.streamer_name,
        title: req.body.title || '',
        image: req.body.image || '',
        thumbnail: req.body.thumbnail || ''
    };

    const status = await service.createHistory(data);

    res.sendStatus(status);
});

router.delete('/', [

    authenticate('user_id'),
    check('user_id').isInt({ min: 0 }),
    checkBadRequest()

], async (req: Request, res: Response) => {

    const id = +req.body.user_id;
    const result = await service.clearHistories(id);

    res.sendStatus(result ? 200 : 404);
});

router.get('/:id', [

    authenticate('user_id'),
    check('id').isInt({ min: 0 }),
    check('user_id').isInt({ min: 0 }),
    checkBadRequest()

], async (req: Request, res: Response) => {

    const id = +req.params.id;
    const userId = +req.body.user_id;
    const result = await service.getHistory(id, userId);

    if (!result) {

        return res.sendStatus(404);
    }

    res.status(200).send(result);
});

router.delete('/:id', [

    authenticate('user_id'),
    check('id').isInt({ min: 0 }),
    check('user_id').isInt({ min: 0 }),
    checkBadRequest()

], async (req: Request, res: Response) => {

    const id = +req.params.id;
    const userId = +req.body.user_id;
    const result = await service.clearHistory(id, userId);

    res.sendStatus(result ? 204 : 404);
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));
router.all('/:id', (_: Request, res: Response) => res.sendStatus(405));

export default router;
