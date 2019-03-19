import { NgModule } from '@angular/core';

import { $mdPanelProvider } from './upgraded-providers/$mdPanel-provider/$mdPanel-provider';
import { $rootScopeProvider } from './upgraded-providers/$rootScope-provider/$rootScope-provider';
import { authenticatorProvider } from './upgraded-providers/authenticator-provider/authenticator-provider';
import { bookmarkManagerProvider } from './upgraded-providers/bookmark-manager-provider/bookmark-manager-provider';
import { channelHttpProvider } from './upgraded-providers/channel-http-provider/channel-http-provider';
import { customRoutingServiceProvider } from './upgraded-providers/custom-routing-provider/custom-routing-provider';
import { gameManagerProvider } from './upgraded-providers/game-manager-provider/game-manager-provider';
import { thumbnailPlayerProvider } from './upgraded-providers/thumbnail-player-provider/thumbnail-player-provider';
import { viewHistoryManagerProvider } from './upgraded-providers/view-history-manager-provider/view-history-manager-provider';

@NgModule({
    providers: [
        $mdPanelProvider,
        $rootScopeProvider,
        authenticatorProvider,
        bookmarkManagerProvider,
        channelHttpProvider,
        customRoutingServiceProvider,
        gameManagerProvider,
        thumbnailPlayerProvider,
        viewHistoryManagerProvider
    ]
})
export class CoreModule { }
