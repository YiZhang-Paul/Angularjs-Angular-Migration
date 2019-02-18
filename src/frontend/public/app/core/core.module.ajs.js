import { AuthenticatorService } from './services/authentication/authenticator/authenticator.service';
import { BookmarkHttpService } from './services/http/bookmark-http/bookmark-http.service';
import { BookmarkManagerService } from './services/data-managers/bookmark-manager/bookmark-manager.service';
import { ChannelHttpService } from './services/http/channel-http/channel-http.service';
import { CustomRoutingService } from './services/custom-routing/custom-routing.service';
import { GameHttpService } from './services/http/game-http/game-http.service';
import { GameManagerService } from './services/data-managers/game-manager/game-manager.service';
import { GenericUtilitiesService } from './services/utilities/generic-utilities/generic-utilities.service';
import { ThumbnailPlayerService } from './services/utilities/thumbnail-player/thumbnail-player.service';
import { ViewHistoryHttpService } from './services/http/view-history-http/view-history-http.service';
import { ViewHistoryManagerService } from './services/data-managers/view-history-manager/view-history-manager.service';

const moduleName = 'sample-app-core';

export default moduleName;

angular.module(moduleName, [])
    .service('authenticatorService', AuthenticatorService)
    .service('bookmarkHttpService', BookmarkHttpService)
    .service('bookmarkManagerService', BookmarkManagerService)
    .service('channelHttpService', ChannelHttpService)
    .service('customRoutingService', CustomRoutingService)
    .service('gameHttpService', GameHttpService)
    .service('gameManagerService', GameManagerService)
    .service('genericUtilitiesService', GenericUtilitiesService)
    .service('thumbnailPlayerService', ThumbnailPlayerService)
    .service('viewHistoryHttpService', ViewHistoryHttpService)
    .service('viewHistoryManagerService', ViewHistoryManagerService);
