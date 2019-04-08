import { NgModule } from '@angular/core';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

import { $mdDialogProvider } from './upgraded-providers/$mdDialog-provider/$mdDialog-provider';
import { $mdPanelProvider } from './upgraded-providers/$mdPanel-provider/$mdPanel-provider';
import { $rootScopeProvider } from './upgraded-providers/$rootScope-provider/$rootScope-provider';
import { $stateProvider } from './upgraded-providers/$state-provider/$state-provider';
import { $stateParamsProvider } from './upgraded-providers/$stateParams-provider/$stateParams-provider';
import { AuthenticatorService } from './services/authentication/authenticator/authenticator.service';
import { BookmarkHttpService } from './services/http/bookmark-http/bookmark-http.service';
import { bookmarkManagerProvider } from './upgraded-providers/bookmark-manager-provider/bookmark-manager-provider';
import { ChannelHttpService } from './services/http/channel-http/channel-http.service';
import { CustomRoutingService } from './services/custom-routing/custom-routing.service';
import { GameHttpService } from './services/http/game-http/game-http.service';
import { gameManagerProvider } from './upgraded-providers/game-manager-provider/game-manager-provider';
import { GenericUtilitiesService } from './services/utilities/generic-utilities/generic-utilities.service';
import { ThumbnailPlayerService } from './services/utilities/thumbnail-player/thumbnail-player.service';
import { viewHistoryManagerProvider } from './upgraded-providers/view-history-manager-provider/view-history-manager-provider';
import * as CoreModuleAjs from './core.module.ajs.js';

@NgModule({
    providers: [
        $mdDialogProvider,
        $mdPanelProvider,
        $rootScopeProvider,
        $stateProvider,
        $stateParamsProvider,
        AuthenticatorService,
        BookmarkHttpService,
        bookmarkManagerProvider,
        ChannelHttpService,
        CustomRoutingService,
        GameHttpService,
        gameManagerProvider,
        GenericUtilitiesService,
        ThumbnailPlayerService,
        viewHistoryManagerProvider
    ]
})
export class CoreModule { }

angular.module(CoreModuleAjs.default)
    .factory('authenticatorService', downgradeInjectable(AuthenticatorService) as any)
    .factory('bookmarkHttpService', downgradeInjectable(BookmarkHttpService) as any)
    .factory('channelHttpService', downgradeInjectable(ChannelHttpService) as any)
    .factory('customRoutingService', downgradeInjectable(CustomRoutingService) as any)
    .factory('gameHttpService', downgradeInjectable(GameHttpService) as any)
    .factory('genericUtilitiesService', downgradeInjectable(GenericUtilitiesService) as any)
    .factory('thumbnailPlayerService', downgradeInjectable(ThumbnailPlayerService) as any);
