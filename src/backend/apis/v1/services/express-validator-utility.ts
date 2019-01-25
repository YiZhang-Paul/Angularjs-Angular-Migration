import { Request, RequestHandler, Response } from 'express';
import { validationResult } from 'express-validator/check';

export function checkBadRequest(status = 400): RequestHandler {

    return (request: Request, response: Response, next: Function) => {

        if (!validationResult(request).isEmpty()) {

            return response.sendStatus(status);
        }

        next();
    };
}
