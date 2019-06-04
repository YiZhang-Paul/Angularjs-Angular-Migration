import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { IBasicCredential } from '../../../core/interfaces/authentication/basic-credential.interface';
import { AuthenticatorService } from '../../../core/services/authentication/authenticator/authenticator.service';
import { UserLoginService } from '../../../core/services/authentication/user-login/user-login.service';

import { UserLoginDialog } from './user-login-dialog/user-login-dialog';

@Component({
    selector: 'user-login',
    styleUrls: ['./user-login.scss'],
    templateUrl: './user-login.html'
})
export class UserLoginComponent {

    private _user: any = null;

    constructor(private _dialog: MatDialog,
                private _authenticator: AuthenticatorService,
                private _userLogin: UserLoginService) { }

    get user(): any {

        return this._user;
    }

    get isAuthenticated(): boolean {

        return this._authenticator.isAuthenticated;
    }

    public tryLogin(): void {

        const callback = this.onLogin.bind(this);
        const option = { width: '20%', data: { callback } };
        this._dialog.open(UserLoginDialog, option);
    }

    private async onLogin(credentials: IBasicCredential): Promise<any> {

        this._user = await this._userLogin.login(credentials);
    }

    public logout(): void {

        this._userLogin.logout();
    }
}
