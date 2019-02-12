import { Injectable } from '@angular/core';
import * as angular from 'angular';

import { $mdPanel } from '../../shared/upgraded-providers/$mdPanel.provider';
import { $rootScope } from '../../shared/upgraded-providers/$rootScope.provider';
import { Authenticator } from '../../shared/upgraded-providers/authenticator.provider';
import { UserHttpService } from '../../shared/services/user-http.service';

import { LoginPanelComponent } from './login-panel/login-panel.component.js';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private _$mdPanel: $mdPanel;
    private _$rootScope: $rootScope;
    private _authenticator: Authenticator;
    private _userHttpService: UserHttpService;

    constructor(

        $mdPanel: $mdPanel,
        $rootScope: $rootScope,
        authenticator: Authenticator,
        userHttpService: UserHttpService

    ) {

        this._$mdPanel = $mdPanel;
        this._$rootScope = $rootScope;
        this._authenticator = authenticator;
        this._userHttpService = userHttpService;
    }

    private getUser(): Promise<any> {

        return this._userHttpService.getUser().catch(error => {

            console.log(error);

            return null;
        });
    }

    public login(credentials: any): Promise<any> {

        const { username, password } = credentials;

        return this._authenticator.requestToken(username, password).then(() => {

            this._$rootScope.$broadcast('userAuthenticated');

            return this.getUser();
        });
    }

    public logout(): void {

        this._authenticator.clearToken();
        this._$rootScope.$broadcast('userLoggedOut');
    }

    public openLoginPanel(loginCallback: Function): Promise<any> {

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
}
