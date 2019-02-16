import { Component } from '@angular/core';

import { Authenticator } from '../../../core/upgraded-providers/authenticator-provider/authenticator-provider';
import { UserLoginService } from '../../../core/services/authentication/user-login/user-login.service';

@Component({
    selector: 'user-login',
    styles: [`${require('./user-login.scss')}`],
    template: require('./user-login.html')
})
export class UserLoginComponent {

    private _user: any = null;
    private _authenticator: Authenticator;
    private _loginService: UserLoginService;

    constructor(authenticator: Authenticator, loginService: UserLoginService) {

        this._authenticator = authenticator;
        this._loginService = loginService;
    }

    get user(): any {

        return this._user;
    }

    get isAuthenticated(): boolean {

        return this._authenticator.isAuthenticated;
    }

    private onLogin(credentials: any): Promise<any> {

        return this._loginService.login(credentials).then(user => {

            this._user = user;
        });
    }

    public tryLogin(): void {

        const onLogin = this.onLogin.bind(this);
        this._loginService.openLoginPanel(onLogin);
    }

    public logout(): void {

        this._loginService.logout();
    }
}
