import config = require('config');
import { Request, Response, Router } from 'express';
import { body, check } from 'express-validator/check';

import { checkBadRequest } from '../services/express-validator-utility';
import { authenticate } from '../authentication/fake-authenticator';
import services from '../services';

import bookmarkRoute from './bookmark';
import viewHistoryRoute from './view-history';

const router = Router();
const rootUrl = config.get<string>('root_url');
const service = services.user;

router.get('/', authenticate('id'), async (req: Request, res: Response) => {

    const id = +req.body.id;
    const result = await service.getUser(id);

    res.status(200).send(result);
});

router.post('/', [

    check('account_id').isInt({ min: 0 }),
    body('name').not().isEmpty().isLength({ min: 4 }).trim().escape(),
    checkBadRequest()

], async (req: Request, res: Response) => {

    const accountId = +req.body.account_id;
    const name = req.body.name;
    const baseUrl = `http://127.0.0.1:4150${rootUrl}/user`;
    const result = await service.createUser(accountId, { name, baseUrl });

    res.sendStatus(result ? 201 : 400);
});

router.put('/', authenticate('id'), [

    body('name').not().isEmpty().isLength({ min: 4 }).trim().escape(),
    checkBadRequest()

], async (req: Request, res: Response) => {

    const { id, name } = req.body;
    const result = await service.updateUser(id, { name });

    res.sendStatus(result ? 204 : 400);
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));

router.use('/bookmarks', bookmarkRoute);
router.use('/histories', viewHistoryRoute);

export default router;
