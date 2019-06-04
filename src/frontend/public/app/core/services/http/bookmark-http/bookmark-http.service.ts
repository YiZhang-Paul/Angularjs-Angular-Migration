import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticatorService } from '../../authentication/authenticator/authenticator.service';

@Injectable({
    providedIn: 'root'
})
export class BookmarkHttpService {

    private _api = 'http://127.0.0.1:4150/api/v1/user/bookmarks';

    constructor(private _http: HttpClient, private _authenticator: AuthenticatorService) { }

    private get _defaultOptions(): any {

        const options = this._authenticator.defaultOptions;

        return Object.assign({ responseType: 'text' }, options);
    }

    public getBookmarks(): Promise<any> {

        const options = this._authenticator.defaultOptions;

        return this._http.get<any>(this._api, options).toPromise();
    }

    public addBookmark(data: any): Promise<any> {

        const options = this._defaultOptions;

        return this._http.post(this._api, data, options).toPromise();
    }

    public deleteBookmark(id: number): Promise<any> {

        const url = `${this._api}/${id}`;
        const options = this._defaultOptions;

        return this._http.delete(url, options).toPromise();
    }
}
