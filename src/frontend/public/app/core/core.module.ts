import { NgModule } from '@angular/core';

import { $mdPanelProvider } from './upgraded-providers/$mdPanel-provider/$mdPanel-provider';
import { $rootScopeProvider } from './upgraded-providers/$rootScope-provider/$rootScope-provider';
import { authenticatorProvider } from './upgraded-providers/authenticator-provider/authenticator-provider';

@NgModule({
    providers: [
        $mdPanelProvider,
        $rootScopeProvider,
        authenticatorProvider
    ]
})
export class CoreModule { }
