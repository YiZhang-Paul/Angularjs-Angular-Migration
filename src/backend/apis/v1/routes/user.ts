import config = require('config');
import { Request, Response, Router } from 'express';
import { body, check, validationResult } from 'express-validator/check';

import FakeAuthenticator from '../authentication/fake-authenticator';
import services from '../services';

const router = Router();
const rootUrl = config.get<string>('root_url');
const service = services.user;
const authenticator = new FakeAuthenticator();

router.get('/', async (req: Request, res: Response) => {

    const status = authenticator.authenticate(req);

    if (status !== 200) {

        return res.sendStatus(status);
    }

    const result = service.getUser(+req.body['id']);

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

router.put('/', [

    body('name').not().isEmpty().isLength({ min: 4 }).trim().escape()

], async (req: Request, res: Response) => {

    const error = validationResult(req);
    const status = error.isEmpty() ? authenticator.authenticate(req) : 400;
    const { id, name } = req.body;

    if (status !== 200) {

        return res.sendStatus(status);
    }

    if (!await service.hasUser(id)) {

        return res.sendStatus(404);
    }

    const result = await service.updateUser(id, { name });

    res.sendStatus(result ? 204 : 400);
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));

export default router;

// api/v1/user - needs authentication (except for POST)
//     (1). GET - retrieve user record (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (2). POST - create user record (201 Created/400 Bad Request)
//     (3). PUT - update user record (204 No Content/401 Unauthorized/403 Forbidden/404 Not Found)
//     (4). otherwise - 405 Method Not Allowed
