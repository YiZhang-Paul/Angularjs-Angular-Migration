import { NgModule } from '@angular/core';

import { $mdPanelProvider } from './upgraded-providers/$mdPanel-provider/$mdPanel-provider';
import { $rootScopeProvider } from './upgraded-providers/$rootScope-provider/$rootScope-provider';
import { authenticatorProvider } from './upgraded-providers/authenticator-provider/authenticator-provider';
import { customRoutingServiceProvider } from './upgraded-providers/custom-routing-provider/custom-routing-provider';
import { gameManagerProvider } from './upgraded-providers/game-manager-provider/game-manager-provider';
import { thumbnailPlayerProvider } from './upgraded-providers/thumbnail-player-provider/thumbnail-player-provider';

@NgModule({
    providers: [
        $mdPanelProvider,
        $rootScopeProvider,
        authenticatorProvider,
        customRoutingServiceProvider,
        gameManagerProvider,
        thumbnailPlayerProvider
    ]
})
export class CoreModule { }
