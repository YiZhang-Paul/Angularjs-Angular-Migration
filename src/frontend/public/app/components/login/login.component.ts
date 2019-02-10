import { Component } from '@angular/core';

import { $rootScope } from '../../shared/upgraded-providers/$rootScope.provider';
import { $state } from '../../shared/upgraded-providers/$state.provider';
import { Authenticator } from '../../shared/upgraded-providers/authenticator.provider';
// TODO: need tests
@Component({
    selector: 'login',
    styles: [`${require('./login.component.css')}`],
    template: require('./login.component.html')
})
export class LoginComponent {

    private _$state: $state;
    private _$rootScope: $rootScope;
    private _authenticator: Authenticator;

    constructor($state: $state, $rootScope: $rootScope, authenticator: Authenticator) {

        this._$state = $state;
        this._$rootScope = $rootScope;
        this._authenticator = authenticator;
    }

    public login() {

        const credentials = ['john doe', 'password'];

        this._authenticator.requestToken(...credentials).then(() => {

            this._$state.reload();
            this._$rootScope.$broadcast('userAuthenticated');
        });
    }
}
