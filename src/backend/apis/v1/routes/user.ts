import config = require('config');
import { Request, Response, Router } from 'express';
import { body, check, validationResult } from 'express-validator/check';
import { Document } from 'mongoose';

import AccountRepositoryFactory from '../../../shared/repositories/account-repository/account-repository.factory';
import UserRepositoryFactory from '../../../shared/repositories/user-repository/user-repository.factory';

const router = Router();
const rootUrl = config.get<string>('root_url');
const accountRepository = new AccountRepositoryFactory().createRepository();
const userRepository = new UserRepositoryFactory().createRepository();

// TODO: backdoor for testing purpose only
function fakeAuthenticate(req: Request): boolean {

    const bearer = req.headers['authorization'];

    if (!bearer) {

        return false;
    }

    const token = bearer.trim().replace(/^bearer\s*/ig, '');
    // tslint:disable-next-line:max-line-length
    return token === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
}
// TODO: extract to class
function excludeKeys(data: any[], excludes: string[]): any[] {

    return data.map(_ => {

        const json = JSON.stringify(_, (key, value) => {

            return excludes.includes(key) ? undefined : value;
        });

        return JSON.parse(json);
    });
}

function toObjects(documents: Document[]): any[] {

    const objects = documents.map(_ => _.toObject());

    return excludeKeys(objects, ['_id', '__v']);
}

router.get('/', async (req: Request, res: Response) => {

    if (!fakeAuthenticate(req)) {

        return res.sendStatus(401);
    }

    if (isNaN(req.body['id'])) {

        req.body['id'] = -1;
    }

    const id = +req.body['id'];

    if (id < 0 || id > 3) {

        return res.sendStatus(403);
    }

    const result = await userRepository.findById(id);

    if (!result) {

        return res.sendStatus(404);
    }

    res.status(200).send(toObjects([result])[0]);
});

router.post('/', [

    check('account_id').isInt({ min: 0 }),
    body('name').trim().escape()

], async (req: Request, res: Response) => {

    const error = validationResult(req);

    if (error.isEmpty()) {

        const accountId = +req.body['account_id'];
        const account = await accountRepository.findById(accountId);

        if (account) {

            const user = await userRepository.findByAccountId(accountId);

            if (!user) {

                const result = await userRepository.insertOne({

                    account_id: accountId,
                    name: req.body['name'],
                    view_histories: `http://127.0.0.1:4150${rootUrl}/user/histories`,
                    bookmarks: `http://127.0.0.1:4150${rootUrl}/user/bookmarks`
                });

                if (result) {

                    return res.sendStatus(201);
                }
            }
        }
    }

    res.sendStatus(400);
});

router.put('/', [body('name').not().isEmpty().isLength({ min: 4 }).trim().escape()], async (req: Request, res: Response) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {

        return res.sendStatus(400);
    }

    if (!fakeAuthenticate(req)) {

        return res.sendStatus(401);
    }

    if (isNaN(req.body['id'])) {

        req.body['id'] = -1;
    }

    const id = +req.body['id'];

    if (id < 0 || id > 3) {

        return res.sendStatus(403);
    }

    const user = await userRepository.findById(id);

    if (!user) {

        return res.sendStatus(404);
    }

    const result = await userRepository.updateOne({ name: req.body['name'] }, { id });

    if (!result) {

        return res.sendStatus(400);
    }

    res.sendStatus(204);
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));

export default router;

// api/v1/user - needs authentication (except for POST)
//     (1). GET - retrieve user record (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (2). POST - create user record (201 Created/400 Bad Request)
//     (3). PUT - update user record (204 No Content/401 Unauthorized/403 Forbidden/404 Not Found)
//     (4). otherwise - 405 Method Not Allowed
