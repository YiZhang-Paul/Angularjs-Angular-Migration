import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChannelHttpService {

    private readonly _baseApi = 'http://127.0.0.1:4150/api/v1';

    constructor(private _http: HttpClient) { }

    public getChannels(): Promise<any> {

        const url = `${this._baseApi}/channels`;

        return this._http.get<any>(url).toPromise();
    }

    public getChannelsByGameId(id: number): Promise<any> {

        const url = `${this._baseApi}/games/${id}/channels`;

        return this._http.get<any>(url).toPromise();
    }
}
