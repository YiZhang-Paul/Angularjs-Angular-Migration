import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { downgradeComponent } from '@angular/upgrade/static';
import { ClickOutsideModule } from 'ng-click-outside';
import { ToastrModule } from 'ngx-toastr';
import * as angular from 'angular';

import * as SharedModuleAjs from './shared.module.ajs.js';
import { ChannelBadgeComponent } from './components/badges/channel-badge/channel-badge.component';
import { GameBadgeComponent } from './components/badges/game-badge/game-badge.component';
import { SidebarBadgeComponent } from './components/badges/sidebar-badge/sidebar-badge.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { DropdownSearchBoxComponent } from './components/dropdown-search-box/dropdown-search-box.component';
import { TopNavigationBarComponent } from './components/top-navigation-bar/top-navigation-bar.component';
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
        ToastrModule.forRoot({
            maxOpened: 5,
            newestOnTop: true
        }),
        MatExpansionModule,
        MatIconModule
    ],
    declarations: [
        ChannelBadgeComponent,
        GameBadgeComponent,
        SidebarBadgeComponent,
        SidebarComponent,
        SearchBoxComponent,
        DropdownSearchBoxComponent,
        TopNavigationBarComponent,
        UserWidgetComponent,
        UserLoginComponent,
        CapitalizePipe,
        ShortViewCountPipe,
        UppercaseRomanNumeralsPipe
    ],
    entryComponents: [
        ChannelBadgeComponent,
        GameBadgeComponent,
        SidebarBadgeComponent,
        SidebarComponent,
        SearchBoxComponent,
        DropdownSearchBoxComponent,
        TopNavigationBarComponent,
        UserWidgetComponent,
        UserLoginComponent
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule,
        MatExpansionModule,
        MatIconModule,
        ChannelBadgeComponent,
        GameBadgeComponent,
        SidebarBadgeComponent,
        SidebarComponent,
        SearchBoxComponent,
        DropdownSearchBoxComponent,
        TopNavigationBarComponent,
        UserWidgetComponent,
        UserLoginComponent,
        CapitalizePipe,
        ShortViewCountPipe,
        UppercaseRomanNumeralsPipe
    ]
})
export class SharedModule { }

angular.module(SharedModuleAjs.default)
    .directive('channelBadge', downgradeComponent({ component: ChannelBadgeComponent }))
    .directive('gameBadge', downgradeComponent({ component: GameBadgeComponent }))
    .directive('sidebarBadge', downgradeComponent({ component: SidebarBadgeComponent }))
    .directive('sidebar', downgradeComponent({ component: SidebarComponent }))
    .directive('searchBox', downgradeComponent({ component: SearchBoxComponent }))
    .directive('dropdownSearchBox', downgradeComponent({ component: DropdownSearchBoxComponent }))
    .directive('topNavbar', downgradeComponent({ component: TopNavigationBarComponent }))
    .directive('userLogin', downgradeComponent({ component: UserLoginComponent }));
