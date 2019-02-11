import { Component, OnInit } from '@angular/core';

import { $rootScope } from '../../shared/upgraded-providers/$rootScope.provider';

import { UserWidgetService } from './user-widget.service';
// TODO: need tests
@Component({
    selector: 'user-widget',
    styles: [`${require('./user-widget.scss')}`],
    template: require('./user-widget.html')
})
export class UserWidgetComponent implements OnInit {

    private _user: any;
    private _$scope: any;
    private _service: UserWidgetService;

    constructor($rootScope: $rootScope, service: UserWidgetService) {

        this._$scope = $rootScope.$new();
        this._service = service;
    }

    get user(): any {

        return this._user;
    }

    public ngOnInit(): void {

        this._$scope.$on('userAuthenticated', () => this.loadUser());
    }

    private loadUser(): void {

        this._service.getUser().then(user => this._user = user);
    }
}
