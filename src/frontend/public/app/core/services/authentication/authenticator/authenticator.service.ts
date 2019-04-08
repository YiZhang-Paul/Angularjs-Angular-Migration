import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthenticatorService {

    private readonly _api = 'http://127.0.0.1:4150/api/v1/authenticate';
    private _header = '';
    private _payload = '';
    private _signature = '';

    private _http: HttpClient;

    constructor(http: HttpClient) {

        this._http = http;
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

    public requestToken(username, password) {

        const data = { username, password };

        return this._http.post(this._api, data).toPromise().then((response: { token: any }) => {

            const token = response.token;
            [this._header, this._payload, this._signature] = token.split('.');

            return token;
        });
    }

    public clearToken() {

        this._header = '';
        this._payload = '';
        this._signature = '';
    }
}
