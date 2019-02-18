export class AuthenticatorService {

    constructor($http) {
        'ngInject';
        this.$http = $http;

        this._header = '';
        this._payload = '';
        this._signature = '';

        this.api = 'http://127.0.0.1:4150/api/v1/authenticate';
    }

    get token() {

        return `${this._header}.${this._payload}.${this._signature}`;
    }

    get defaultHeaders() {

        return ({ 'Authorization': `bearer ${this.token}` });
    }

    get defaultOptions() {

        return ({ headers: this.defaultHeaders });
    }

    get isAuthenticated() {

        return !!(this._header && this._payload && this._signature);
    }

    requestToken(username, password) {

        const data = { username, password };
        const options = [this.api, data];

        return this.$http.post(...options).then(response => {

            const token = response.data.token;
            [this._header, this._payload, this._signature] = token.split('.');
        });
    }

    clearToken() {

        this._header = '';
        this._payload = '';
        this._signature = '';
    }
}
