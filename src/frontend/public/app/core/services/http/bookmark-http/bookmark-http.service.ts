import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticatorService } from '../../authentication/authenticator/authenticator.service';

@Injectable({
    providedIn: 'root'
})
export class BookmarkHttpService {

    private _api = 'http://127.0.0.1:4150/api/v1/user/bookmarks';

    private _http: HttpClient;
    private _authenticator: AuthenticatorService;

    constructor(http: HttpClient, authenticator: AuthenticatorService) {

        this._http = http;
        this._authenticator = authenticator;
    }

    private getDefaultOptions() {

        const options = this._authenticator.defaultOptions;

        return Object.assign({ responseType: 'text' }, options);
    }

    public getBookmarks(): Promise<any> {

        const options = this._authenticator.defaultOptions;

        return this._http.get<any>(this._api, options).toPromise();
    }

    public addBookmark(data): Promise<any> {

        const options = this.getDefaultOptions();

        return this._http.post(this._api, data, options).toPromise();
    }

    public deleteBookmark(id): Promise<any> {

        const url = `${this._api}/${id}`;
        const options = this.getDefaultOptions();

        return this._http.delete(url, options).toPromise();
    }
}
