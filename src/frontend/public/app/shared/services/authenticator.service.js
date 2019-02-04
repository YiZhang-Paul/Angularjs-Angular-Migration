export class AuthenticatorService {

    constructor() {

        this._token = {

            header: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            payload: 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
            signature: 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        };
    }

    get token() {

        const { header, payload, signature } = this._token;

        return `${header}.${payload}.${signature}`;
    }

    get defaultHeaders() {

        return ({ 'Authorization': `bearer ${this.token}` });
    }

    get defaultOptions() {

        return ({ headers: this.defaultHeaders });
    }
}
