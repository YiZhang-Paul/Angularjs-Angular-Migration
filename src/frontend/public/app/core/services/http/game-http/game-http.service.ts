import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GameHttpService {

    private readonly _api = 'http://127.0.0.1:4150/api/v1/games';

    private _http: HttpClient;

    constructor(http: HttpClient) {

        this._http = http;
    }

    public getGame(id): Promise<any> {

        const url = `${this._api}/${id}`;

        return this._http.get<any>(url).toPromise().then(response => {

            return response[0] ? response[0] : null;
        });
    }

    public getGameByName(name): Promise<any> {

        return this.getGames().then(games => {

            const game = games.find(_ => _.name === name);

            return game ? game : null;
        });
    }

    public getGames(): Promise<any> {

        return this._http.get<any>(this._api).toPromise();
    }
}
