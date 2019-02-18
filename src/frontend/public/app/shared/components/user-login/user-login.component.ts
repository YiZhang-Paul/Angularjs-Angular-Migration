import { Component } from '@angular/core';
import * as angular from 'angular';

import { $mdPanel } from '../../../core/upgraded-providers/$mdPanel-provider/$mdPanel-provider';
import { Authenticator } from '../../../core/upgraded-providers/authenticator-provider/authenticator-provider';
import { UserLoginService } from '../../../core/services/authentication/user-login/user-login.service';

import { LoginPanelComponent } from './login-panel/login-panel.component.js';

@Component({
    selector: 'user-login',
    styles: [`${require('./user-login.scss')}`],
    template: require('./user-login.html')
})
export class UserLoginComponent {

    private _user: any = null;
    private _$mdPanel: $mdPanel;
    private _authenticator: Authenticator;
    private _userLogin: UserLoginService;

    constructor(

        $mdPanel: $mdPanel,
        authenticator: Authenticator,
        userLogin: UserLoginService

    ) {

        this._$mdPanel = $mdPanel;
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

    private openLoginPanel(loginCallback: Function): Promise<any> {

        const position = this._$mdPanel.newPanelPosition();

        return this._$mdPanel.open({

            locals: { loginCallback },
            controller: LoginPanelComponent.controller,
            controllerAs: '$ctrl',
            templateUrl: LoginPanelComponent.templateUrl,
            panelClass: 'login-panel-container',
            position: position.absolute().center(),
            zIndex: 150,
            attachTo: angular.element(document.body),
            disableParentScroll: true,
            clickOutsideToClose: true,
            escapeToClose: true,
            hasBackdrop: true,
            focusOnOpen: true,
            trapFocus: true
        });
    }

    public tryLogin(): void {

        const onLogin = this.onLogin.bind(this);
        this.openLoginPanel(onLogin);
    }

    public logout(): void {

        this._userLogin.logout();
    }
}
