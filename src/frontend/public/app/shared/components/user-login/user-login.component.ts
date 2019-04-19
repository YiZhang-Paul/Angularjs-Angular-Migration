import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AuthenticatorService } from '../../../core/services/authentication/authenticator/authenticator.service';
import { UserLoginService } from '../../../core/services/authentication/user-login/user-login.service';

import { UserLoginDialog } from './user-login-dialog/user-login-dialog';

@Component({
    selector: 'user-login',
    styles: [`${require('./user-login.scss')}`],
    template: require('./user-login.html')
})
export class UserLoginComponent {

    private _user: any = null;

    private _dialog: MatDialog;
    private _authenticator: AuthenticatorService;
    private _userLogin: UserLoginService;

    constructor(

        dialog: MatDialog,
        authenticator: AuthenticatorService,
        userLogin: UserLoginService

    ) {

        this._dialog = dialog;
        this._authenticator = authenticator;
        this._userLogin = userLogin;
    }

    get user(): any {

        return this._user;
    }

    get isAuthenticated(): boolean {

        return this._authenticator.isAuthenticated;
    }

    private async onLogin(credentials: any): Promise<any> {

        this._user = await this._userLogin.login(credentials);
    }

    public tryLogin(): void {

        const callback = this.onLogin.bind(this);
        const option = { width: '20%', data: { callback } };
        this._dialog.open(UserLoginDialog, option);
    }

    public logout(): void {

        this._userLogin.logout();
    }
}
