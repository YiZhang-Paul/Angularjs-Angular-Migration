import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { downgradeComponent } from '@angular/upgrade/static';
import { ClickOutsideModule } from 'ng-click-outside';
import * as angular from 'angular';

import { UserWidgetComponent } from './components/user-widget/user-widget.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ClickOutsideModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatIconModule
    ],
    declarations: [
        UserWidgetComponent,
        UserLoginComponent
    ],
    entryComponents: [
        UserWidgetComponent,
        UserLoginComponent
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatIconModule
    ]
})
export class SharedModule { }

angular.module('migration-sample-app')
    .directive('userLogin', downgradeComponent({ component: UserLoginComponent }));
