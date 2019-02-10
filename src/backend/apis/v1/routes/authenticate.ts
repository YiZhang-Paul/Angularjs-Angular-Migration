import { Request, Response, Router } from 'express';
import { body } from 'express-validator/check';

import { checkBadRequest } from '../services/express-validator-utility';
import { issueAccessToken, isValidCredential } from '../authentication/fake-authenticator';

const router = Router();

router.post('/', [

    body('username').not().isEmpty().trim().escape().isLength({ min: 3 }),
    body('password').not().isEmpty().trim().escape().isLength({ min: 5 }),
    checkBadRequest(401)

], async (req: Request, res: Response) => {

    const { username, password } = req.body;

    if (!isValidCredential(username, password)) {

        return res.sendStatus(401);
    }

    res.status(200).send({ token: issueAccessToken() });
});

router.all('/', (_: Request, res: Response) => res.sendStatus(405));

export default router;
