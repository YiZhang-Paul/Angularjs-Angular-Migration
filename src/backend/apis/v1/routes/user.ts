import config = require('config');
import { Request, Response, Router } from 'express';
import { body, check, validationResult } from 'express-validator/check';

import { authenticate } from '../authentication/fake-authenticator';
import services from '../services';

const router = Router();
const rootUrl = config.get<string>('root_url');
const service = services.user;

router.get('/', authenticate, async (req: Request, res: Response) => {

    const result = await service.getUser(+req.body['id']);

    if (!result) {

        return res.sendStatus(404);
    }

    res.status(200).send(result);
});

router.post('/', [

    check('account_id').isInt({ min: 0 }),
    body('name').trim().escape()

], async (req: Request, res: Response) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {

        return res.sendStatus(400);
    }

    const accountId = +req.body['account_id'];
    const name = req.body['name'];
    const baseUrl = `http://127.0.0.1:4150${rootUrl}/user`;
    const result = await service.createUser(accountId, { name, baseUrl });

    res.sendStatus(result ? 201 : 400);
});

router.put('/', authenticate, [

    body('name').not().isEmpty().isLength({ min: 4 }).trim().escape()

], async (req: Request, res: Response) => {

    const { id, name } = req.body;
    const error = validationResult(req);

    if (!error.isEmpty()) {

        res.sendStatus(400);
    }

    if (!await service.hasUser(id)) {

        return res.sendStatus(404);
    }

    const result = await service.updateUser(id, { name });

    res.sendStatus(result ? 204 : 400);
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));

export default router;
