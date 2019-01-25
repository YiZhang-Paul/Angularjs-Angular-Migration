import { Request, RequestHandler, Response } from 'express';

import UserRepositoryFactory from '../../../shared/repositories/user-repository/user-repository.factory';
import IUserRepository from '../../../shared/repositories/user-repository/user-repository.interface';

const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const payload = 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
const signature = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const expectedToken = `${header}.${payload}.${signature}`;
// backdoor for testing purpose only
export default class FakeAuthenticator {

    private _repository: IUserRepository;

    public key = 'id';

    constructor(repository: IUserRepository) {

        this._repository = repository;
    }

    private parseToken(header: string): string {

        return header.trim().replace(/^bearer\s*/ig, '');
    }

    private isAuthenticated(request: Request): boolean {

        const header = request.headers.authorization;

        return header ? this.parseToken(header) === expectedToken : false;
    }

    public async authenticate(request: Request): Promise<200 | 401 | 403 | 404> {

        if (!this.isAuthenticated(request)) {

            return 401;
        }

        if (isNaN(request.body[this.key])) {

            request.body[this.key] = 1;
        }

        const id = +request.body[this.key];

        if (id < 0 || id > 3) {

            return 403;
        }

        return await this._repository.has(id) ? 200 : 404;
    }
}

const repository = new UserRepositoryFactory().createRepository();
const authenticator = new FakeAuthenticator(repository);

export function authenticate(key: string): RequestHandler {

    return async (request: Request, response: Response, next: Function) => {

        authenticator.key = key;
        const status = await authenticator.authenticate(request);

        if (status !== 200) {

            return response.sendStatus(status);
        }

        next();
    };
}
