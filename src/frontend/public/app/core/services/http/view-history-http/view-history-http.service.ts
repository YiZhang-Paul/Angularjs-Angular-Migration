import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticatorService } from '../../authentication/authenticator/authenticator.service';

@Injectable({
    providedIn: 'root'
})
export class ViewHistoryHttpService {

    private readonly _api = 'http://127.0.0.1:4150/api/v1/user/histories';

    private _http: HttpClient;
    private _authenticator: AuthenticatorService;

    constructor(http: HttpClient, authenticator: AuthenticatorService) {

        this._http = http;
        this._authenticator = authenticator;
    }

    private getDefaultOptions(): any {

        const options = this._authenticator.defaultOptions;

        return Object.assign({ responseType: 'text' }, options);
    }

    private sortByTimestamp(data: any[]): any[] {

        return data.slice().sort((a, b) => {

            return b.timestamp - a.timestamp;
        });
    }

    public async getHistories(): Promise<any> {

        const options = this._authenticator.defaultOptions;
        const histories = await this._http.get<any>(this._api, options).toPromise();

        return this.sortByTimestamp(histories);
    }

    public addHistory(channel: any): Promise<any> {

        const name = channel.provider_game_name;
        const data = Object.assign({ game_name: name }, channel);
        const options = this.getDefaultOptions();

        return this._http.post(this._api, data, options).toPromise();
    }

    public deleteHistory(id: number): Promise<any> {

        const url = `${this._api}/${id}`;
        const options = this.getDefaultOptions();

        return this._http.delete(url, options).toPromise();
    }

    public deleteHistories(): Promise<any> {

        const options = this.getDefaultOptions();

        return this._http.delete(this._api, options).toPromise();
    }
}
