import { Injectable } from '@angular/core';

import { $rootScope } from '../../../upgraded-providers/$rootScope-provider/$rootScope-provider';
import { Authenticator } from '../../../upgraded-providers/authenticator-provider/authenticator-provider';
import { UserHttpService } from '../../http/user-http/user-http.service';

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    private _$rootScope: $rootScope;
    private _authenticator: Authenticator;
    private _userHttp: UserHttpService;

    constructor(

        $rootScope: $rootScope,
        authenticator: Authenticator,
        userHttp: UserHttpService

    ) {

        this._$rootScope = $rootScope;
        this._authenticator = authenticator;
        this._userHttp = userHttp;
    }

    private async getUser(): Promise<any> {

        try {

            return await this._userHttp.getUser();
        }
        catch (error) {

            console.log(error);

            return null;
        }
    }

    public async login(credentials: any): Promise<any> {

        const { username, password } = credentials;
        await this._authenticator.requestToken(username, password);
        this._$rootScope.$broadcast('userAuthenticated');

        return this.getUser();
    }

    public logout(): void {

        this._authenticator.clearToken();
        this._$rootScope.$broadcast('userLoggedOut');
    }
}
