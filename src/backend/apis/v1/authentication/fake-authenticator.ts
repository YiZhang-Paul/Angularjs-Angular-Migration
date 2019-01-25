import { Request, Response } from 'express';

const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const payload = 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
const signature = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const expectedToken = `${header}.${payload}.${signature}`;
// backdoor for testing purpose only
export default class FakeAuthenticator {

    public key = 'id';

    private parseToken(header: string): string {

        return header.trim().replace(/^bearer\s*/ig, '');
    }

    private isAuthenticated(request: Request): boolean {

        const header = request.headers['authorization'];

        return header ? this.parseToken(header) === expectedToken : false;
    }

    public authenticate(request: Request): 200 | 401 | 403 {

        if (!this.isAuthenticated(request)) {

            return 401;
        }

        if (isNaN(request.body[this.key])) {

            request.body[this.key] = -1;
        }

        const id = +request.body[this.key];

        return id < 0 || id > 3 ? 403 : 200;
    }
}

const authenticator = new FakeAuthenticator();

export function authenticate(key: string): Function {

    return (request: Request, response: Response, next: Function) => {

        authenticator.key = key;
        const status = authenticator.authenticate(request);

        if (status !== 200) {

            return response.sendStatus(status);
        }

        next();
    };
}
