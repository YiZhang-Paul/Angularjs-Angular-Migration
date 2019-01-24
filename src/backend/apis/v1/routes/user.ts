import config = require('config');
import { Request, Response, Router } from 'express';
import { body, check, validationResult } from 'express-validator/check';

import AccountRepositoryFactory from '../../../shared/repositories/account-repository/account-repository.factory';
import UserRepositoryFactory from '../../../shared/repositories/user-repository/user-repository.factory';

const router = Router();
const rootUrl = config.get<string>('root_url');
const accountRepository = new AccountRepositoryFactory().createRepository();
const userRepository = new UserRepositoryFactory().createRepository();

router.get('/', (_: Request, res: Response) => res.sendStatus(200));

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

export default router;

// api/v1/user - needs authentication (except for POST)
//     (1). GET - retrieve user record (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (3). PUT - update user record (204 No Content/401 Unauthorized/403 Forbidden/404 Not Found)
//     (4). otherwise - 405 Method Not Allowed

// api/v1/user - needs authentication (except for POST)
//     (1). GET - retrieve user record (200 OK/401 Unauthorized/403 Forbidden/404 Not Found)
//     (2). POST - create user record (201 Created/400 Bad Request)
//     (3). PUT - update user record (204 No Content/401 Unauthorized/403 Forbidden/404 Not Found)
//     (4). otherwise - 405 Method Not Allowed
