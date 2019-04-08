import { BookmarkHttpService } from './services/http/bookmark-http/bookmark-http.service';
import { BookmarkManagerService } from './services/data-managers/bookmark-manager/bookmark-manager.service';
import { ChannelHttpService } from './services/http/channel-http/channel-http.service';
import { CustomRoutingService } from './services/custom-routing/custom-routing.service';
import { GameManagerService } from './services/data-managers/game-manager/game-manager.service';
import { GenericUtilitiesService } from './services/utilities/generic-utilities/generic-utilities.service';
import { ViewHistoryHttpService } from './services/http/view-history-http/view-history-http.service';
import { ViewHistoryManagerService } from './services/data-managers/view-history-manager/view-history-manager.service';

const moduleName = 'sample-app-core';

export default moduleName;

angular.module(moduleName, [])
    .service('bookmarkHttpService', BookmarkHttpService)
    .service('bookmarkManagerService', BookmarkManagerService)
    .service('channelHttpService', ChannelHttpService)
    .service('customRoutingService', CustomRoutingService)
    .service('gameManagerService', GameManagerService)
    .service('genericUtilitiesService', GenericUtilitiesService)
    .service('viewHistoryHttpService', ViewHistoryHttpService)
    .service('viewHistoryManagerService', ViewHistoryManagerService);
