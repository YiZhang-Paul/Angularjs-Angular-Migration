import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Authenticator } from '../../../upgraded-providers/authenticator-provider/authenticator-provider';

@Injectable({
    providedIn: 'root'
})
export class UserHttpService {

    private readonly _api = 'http://127.0.0.1:4150/api/v1/user';

    private _http: HttpClient;
    private _authenticator: Authenticator;

    constructor(http: HttpClient, authenticator: Authenticator) {

        this._http = http;
        this._authenticator = authenticator;
    }

    public getUser(): Promise<any> {

        const url = this._api;
        const options = this._authenticator.defaultOptions;

        return this._http.get<any>(url, options).toPromise();
    }
}
