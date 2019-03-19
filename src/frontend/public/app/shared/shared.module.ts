import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { downgradeComponent } from '@angular/upgrade/static';
import { ClickOutsideModule } from 'ng-click-outside';
import * as angular from 'angular';

import * as SharedModuleAjs from './shared.module.ajs.js';
import { GameBadgeComponent } from './components/badges/game-badge/game-badge.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { DropdownSearchBoxComponent } from './components/dropdown-search-box/dropdown-search-box.component';
import { UserWidgetComponent } from './components/user-widget/user-widget.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { ShortViewCountPipe } from './pipes/short-view-count/short-view-count.pipe';
import { UppercaseRomanNumeralsPipe } from './pipes/uppercase-roman-numerals/uppercase-roman-numerals.pipe';

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
        GameBadgeComponent,
        SearchBoxComponent,
        DropdownSearchBoxComponent,
        UserWidgetComponent,
        UserLoginComponent,
        CapitalizePipe,
        ShortViewCountPipe,
        UppercaseRomanNumeralsPipe
    ],
    entryComponents: [
        GameBadgeComponent,
        SearchBoxComponent,
        DropdownSearchBoxComponent,
        UserWidgetComponent,
        UserLoginComponent
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatIconModule,
        GameBadgeComponent,
        SearchBoxComponent,
        DropdownSearchBoxComponent,
        UserWidgetComponent,
        UserLoginComponent,
        CapitalizePipe,
        ShortViewCountPipe,
        UppercaseRomanNumeralsPipe
    ]
})
export class SharedModule { }

angular.module(SharedModuleAjs.default)
    .directive('gameBadge', downgradeComponent({ component: GameBadgeComponent }))
    .directive('searchBox', downgradeComponent({ component: SearchBoxComponent }))
    .directive('dropdownSearchBox', downgradeComponent({ component: DropdownSearchBoxComponent }))
    .directive('userLogin', downgradeComponent({ component: UserLoginComponent }));
