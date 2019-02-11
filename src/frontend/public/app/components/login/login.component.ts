import { Component } from '@angular/core';

import { $rootScope } from '../../shared/upgraded-providers/$rootScope.provider';
import { $state } from '../../shared/upgraded-providers/$state.provider';
import { Authenticator } from '../../shared/upgraded-providers/authenticator.provider';

import { LoginService } from './login.service.provider';
// TODO: need tests
@Component({
    selector: 'login',
    styles: [`${require('./login.component.scss')}`],
    template: require('./login.component.html')
})
export class LoginComponent {

    private _$state: $state;
    private _$rootScope: $rootScope;
    private _authenticator: Authenticator;
    private _loginService: LoginService;

    constructor(

        $state: $state,
        $rootScope: $rootScope,
        authenticator: Authenticator,
        loginService: LoginService

    ) {

        this._$state = $state;
        this._$rootScope = $rootScope;
        this._authenticator = authenticator;
        this._loginService = loginService;
    }

    private login(credentials: any): void {

        const { username, password } = credentials;

        return this._authenticator.requestToken(username, password).then(() => {

            this._$state.reload();
            this._$rootScope.$broadcast('userAuthenticated');
        });
    }

    public tryLogin(): void {

        const onLogin = this.login.bind(this);
        this._loginService.openLoginPanel(onLogin);
    }
}
