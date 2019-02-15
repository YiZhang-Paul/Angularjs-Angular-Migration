import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { $mdPanelProvider } from './upgraded-providers/$mdPanel.provider';
import { $rootScopeProvider } from './upgraded-providers/$rootScope.provider';
import { authenticatorProvider } from './upgraded-providers/authenticator.provider';

@NgModule({
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatIconModule
    ],
    providers: [
        $mdPanelProvider,
        $rootScopeProvider,
        authenticatorProvider
    ],
    exports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        MatIconModule
    ]
})
export class SharedModule { }
