import { NgModule } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';

import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [LoginComponent],
    entryComponents: [LoginComponent]
})
export class ComponentsModule { }

angular.module('migration-sample-app')
    .directive('login', downgradeComponent({ component: LoginComponent }) as angular.IDirectiveFactory);
