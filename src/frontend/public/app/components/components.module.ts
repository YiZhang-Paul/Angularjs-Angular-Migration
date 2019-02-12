import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';

import { LoginComponent } from './login/login.component';
import { UserWidgetComponent } from './login/user-widget/user-widget.component';

@NgModule({
    imports: [CommonModule],
    declarations: [LoginComponent, UserWidgetComponent],
    entryComponents: [LoginComponent, UserWidgetComponent]
})
export class ComponentsModule { }

angular.module('migration-sample-app')
    .directive('login', downgradeComponent({ component: LoginComponent }) as angular.IDirectiveFactory);
