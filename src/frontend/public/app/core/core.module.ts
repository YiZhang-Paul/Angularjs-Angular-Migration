import { NgModule } from '@angular/core';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

import { $mdDialogProvider } from './upgraded-providers/$mdDialog-provider/$mdDialog-provider';
import { $mdPanelProvider } from './upgraded-providers/$mdPanel-provider/$mdPanel-provider';
import { $rootScopeProvider } from './upgraded-providers/$rootScope-provider/$rootScope-provider';
import { $stateParamsProvider } from './upgraded-providers/$stateParams-provider/$stateParams-provider';
import { AuthenticatorService } from './services/authentication/authenticator/authenticator.service';
import { bookmarkManagerProvider } from './upgraded-providers/bookmark-manager-provider/bookmark-manager-provider';
import { channelHttpProvider } from './upgraded-providers/channel-http-provider/channel-http-provider';
import { customRoutingServiceProvider } from './upgraded-providers/custom-routing-provider/custom-routing-provider';
import { GameHttpService } from './services/http/game-http/game-http.service';
import { gameManagerProvider } from './upgraded-providers/game-manager-provider/game-manager-provider';
import { ThumbnailPlayerService } from './services/utilities/thumbnail-player/thumbnail-player.service';
import { viewHistoryManagerProvider } from './upgraded-providers/view-history-manager-provider/view-history-manager-provider';
import * as CoreModuleAjs from './core.module.ajs.js';

@NgModule({
    providers: [
        $mdDialogProvider,
        $mdPanelProvider,
        $rootScopeProvider,
        $stateParamsProvider,
        AuthenticatorService,
        bookmarkManagerProvider,
        channelHttpProvider,
        customRoutingServiceProvider,
        GameHttpService,
        gameManagerProvider,
        ThumbnailPlayerService,
        viewHistoryManagerProvider
    ]
})
export class CoreModule { }

angular.module(CoreModuleAjs.default)
    .factory('authenticatorService', downgradeInjectable(AuthenticatorService) as any)
    .factory('thumbnailPlayerService', downgradeInjectable(ThumbnailPlayerService) as any)
    .factory('gameHttpService', downgradeInjectable(GameHttpService) as any);
