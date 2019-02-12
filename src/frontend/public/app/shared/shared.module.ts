import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { $mdPanelProvider } from './upgraded-providers/$mdPanel.provider';
import { $rootScopeProvider } from './upgraded-providers/$rootScope.provider';
import { $stateProvider } from './upgraded-providers/$state.provider';
import { authenticatorProvider } from './upgraded-providers/authenticator.provider';

@NgModule({
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        MatExpansionModule
    ],
    providers: [
        $mdPanelProvider,
        $rootScopeProvider,
        $stateProvider,
        authenticatorProvider
    ],
    exports: [
        BrowserAnimationsModule,
        MatExpansionModule
    ]
})
export class SharedModule { }
