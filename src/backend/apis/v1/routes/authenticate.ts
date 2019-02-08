import { Request, Response, Router } from 'express';
import { body } from 'express-validator/check';

import { checkBadRequest } from '../services/express-validator-utility';
import { issueAccessToken, isValidCredential } from '../authentication/fake-authenticator';

const router = Router();

router.post('/', [

    body('username').not().isEmpty().isLength({ min: 3 }).trim().escape(),
    body('password').not().isEmpty().isLength({ min: 5 }).trim().escape(),
    checkBadRequest(401)

], async (req: Request, res: Response) => {

    const { username, password } = req.body;

    if (!isValidCredential(username, password)) {

        return res.sendStatus(401);
    }

    res.status(200).send(issueAccessToken());
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));

export default router;

// (1). POST - authenticate user credentials (200 OK/401 Unauthorized)
// (2). otherwise - 405 Method Not Allowed
