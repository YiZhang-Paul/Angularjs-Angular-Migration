import { NgModule } from '@angular/core';

import { $mdPanelProvider } from './upgraded-providers/$mdPanel-provider/$mdPanel-provider';
import { $rootScopeProvider } from './upgraded-providers/$rootScope-provider/$rootScope-provider';
import { authenticatorProvider } from './upgraded-providers/authenticator-provider/authenticator-provider';
import { thumbnailPlayerProvider } from './upgraded-providers/thumbnail-player-provider/thumbnail-player-provider';

@NgModule({
    providers: [
        $mdPanelProvider,
        $rootScopeProvider,
        authenticatorProvider,
        thumbnailPlayerProvider
    ]
})
export class CoreModule { }
