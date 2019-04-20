import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideModule } from 'ng-click-outside';
import { ToastrModule } from 'ngx-toastr';

import { ChannelBadgeComponent } from './components/badges/channel-badge/channel-badge.component';
import { GameBadgeComponent } from './components/badges/game-badge/game-badge.component';
import { SidebarBadgeComponent } from './components/badges/sidebar-badge/sidebar-badge.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { DropdownSearchBoxComponent } from './components/dropdown-search-box/dropdown-search-box.component';
import { TopNavigationBarComponent } from './components/top-navigation-bar/top-navigation-bar.component';
import { UserWidgetComponent } from './components/user-widget/user-widget.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserLoginDialog } from './components/user-login/user-login-dialog/user-login-dialog';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { ShortViewCountPipe } from './pipes/short-view-count/short-view-count.pipe';
import { UppercaseRomanNumeralsPipe } from './pipes/uppercase-roman-numerals/uppercase-roman-numerals.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ClickOutsideModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            maxOpened: 5,
            newestOnTop: true
        }),
        MatExpansionModule,
        MatButtonModule,
        MatDialogModule,
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
        UserLoginDialog,
        CapitalizePipe,
        ShortViewCountPipe,
        UppercaseRomanNumeralsPipe
    ],
    entryComponents: [
        UserLoginDialog
    ],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule,
        MatExpansionModule,
        MatButtonModule,
        MatDialogModule,
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
        UserLoginDialog,
        CapitalizePipe,
        ShortViewCountPipe,
        UppercaseRomanNumeralsPipe
    ]
})
export class SharedModule { }
