import { Injectable } from '@angular/core';

import { UserHttpService } from '../../shared/services/user-http.service';

@Injectable({
    providedIn: 'root'
})
export class UserWidgetService {

    private _httpService: UserHttpService;

    constructor(httpService: UserHttpService) {

        this._httpService = httpService;
    }

    public getUser(): Promise<any> {

        return this._httpService.getUser().catch(error => {

            console.log(error);

            return null;
        });
    }
}
