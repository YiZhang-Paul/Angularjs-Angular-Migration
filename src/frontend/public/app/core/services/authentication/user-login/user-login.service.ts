import { Injectable } from '@angular/core';

import { IBasicCredential } from '../../../interfaces/authentication/basic-credential.interface';
import { AuthenticatorService } from '../../../services/authentication/authenticator/authenticator.service';
import { EventManagerService } from '../../events/event-manager.service';
import { UserHttpService } from '../../http/user-http/user-http.service';

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    private _authenticator: AuthenticatorService;
    private _eventManager: EventManagerService;
    private _userHttp: UserHttpService;

    constructor(

        authenticator: AuthenticatorService,
        eventManager: EventManagerService,
        userHttp: UserHttpService

    ) {

        this._authenticator = authenticator;
        this._eventManager = eventManager;
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

    public async login(credentials: IBasicCredential): Promise<any> {

        const { username, password } = credentials;
        await this._authenticator.requestToken(username, password);
        this._eventManager.emit('userAuthenticated');

        return this.getUser();
    }

    public logout(): void {

        this._authenticator.clearToken();
        this._eventManager.emit('userLoggedOut');
    }
}
