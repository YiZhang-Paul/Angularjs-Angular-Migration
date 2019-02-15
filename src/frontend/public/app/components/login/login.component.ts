import { Component } from '@angular/core';

import { Authenticator } from '../../shared/upgraded-providers/authenticator.provider';

import { LoginService } from './login.service';
// TODO: need tests
@Component({
    selector: 'login',
    styles: [`${require('./login.component.scss')}`],
    template: require('./login.component.html')
})
export class LoginComponent {

    private _user: any = null;
    private _authenticator: Authenticator;
    private _loginService: LoginService;

    constructor(authenticator: Authenticator, loginService: LoginService) {

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
