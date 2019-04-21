import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBasicCredential } from '../../../interfaces/authentication/basic-credential.interface';

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

    get token(): string {

        return `${this._header}.${this._payload}.${this._signature}`;
    }

    get defaultHeaders(): { Authorization: string } {

        return ({ 'Authorization': `bearer ${this.token}` });
    }

    get defaultOptions(): { headers: any } {

        return ({ headers: this.defaultHeaders });
    }

    get isAuthenticated(): boolean {

        return !!(this._header && this._payload && this._signature);
    }

    public async requestToken(username: string, password: string): Promise<string> {

        const data: IBasicCredential = { username, password };
        const response = this._http.post<any>(this._api, data);
        const token = (await response.toPromise()).token;
        [this._header, this._payload, this._signature] = token.split('.');

        return token;
    }

    public clearToken(): void {

        this._header = '';
        this._payload = '';
        this._signature = '';
    }
}
