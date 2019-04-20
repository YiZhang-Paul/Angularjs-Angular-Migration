import { NgModule } from '@angular/core';

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

@NgModule({
    providers: [
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
