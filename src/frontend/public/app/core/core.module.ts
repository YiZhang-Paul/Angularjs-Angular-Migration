import { NgModule } from '@angular/core';
import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

import { $stateProvider } from './upgraded-providers/$state-provider/$state-provider';
import { $stateParamsProvider } from './upgraded-providers/$stateParams-provider/$stateParams-provider';
import { AuthenticatorService } from './services/authentication/authenticator/authenticator.service';
import { BookmarkHttpService } from './services/http/bookmark-http/bookmark-http.service';
import { BookmarkManagerService } from './services/data-managers/bookmark-manager/bookmark-manager.service';
import { ChannelHttpService } from './services/http/channel-http/channel-http.service';
import { CustomRoutingService } from './services/custom-routing/custom-routing.service';
import { EventManagerService } from './services/events/event-manager.service';
import { GameHttpService } from './services/http/game-http/game-http.service';
import { GameManagerService } from './services/data-managers/game-manager/game-manager.service';
import { GenericUtilitiesService } from './services/utilities/generic-utilities/generic-utilities.service';
import { ThumbnailPlayerService } from './services/utilities/thumbnail-player/thumbnail-player.service';
import { ViewHistoryHttpService } from './services/http/view-history-http/view-history-http.service';
import { ViewHistoryManagerService } from './services/data-managers/view-history-manager/view-history-manager.service';
import * as CoreModuleAjs from './core.module.ajs.js';

@NgModule({
    providers: [
        $stateProvider,
        $stateParamsProvider,
        AuthenticatorService,
        BookmarkHttpService,
        BookmarkManagerService,
        ChannelHttpService,
        CustomRoutingService,
        EventManagerService,
        GameHttpService,
        GameManagerService,
        GenericUtilitiesService,
        ThumbnailPlayerService,
        ViewHistoryHttpService,
        ViewHistoryManagerService
    ]
})
export class CoreModule { }

angular.module(CoreModuleAjs.default)
    .factory('authenticatorService', downgradeInjectable(AuthenticatorService) as any)
    .factory('bookmarkManagerService', downgradeInjectable(BookmarkManagerService) as any)
    .factory('eventManagerService', downgradeInjectable(EventManagerService) as any)
    .factory('gameManagerService', downgradeInjectable(GameManagerService) as any)
    .factory('viewHistoryManagerService', downgradeInjectable(ViewHistoryManagerService) as any);
