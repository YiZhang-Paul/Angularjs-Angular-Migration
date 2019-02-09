import { AuthenticatorService } from './services/authenticator.service';
import { BookmarkHttpService } from './services/bookmark-http.service';
import { ChannelHttpService } from './services/channel-http.service';
import { GameHttpService } from './services/game-http.service';
import { ViewHistoryHttpService } from './services/view-history-http.service';
import { ThumbnailPlayerService } from './services/thumbnail-player.service';
import { GenericUtilityService } from './services/generic-utility.service';

import { capitalizeFilter } from './filters/capitalize.filter';

const moduleName = 'sample-app-shared';

export default moduleName;

angular.module(moduleName, [])
    .service('authenticatorService', AuthenticatorService)
    .service('bookmarkHttpService', BookmarkHttpService)
    .service('channelHttpService', ChannelHttpService)
    .service('gameHttpService', GameHttpService)
    .service('viewHistoryHttpService', ViewHistoryHttpService)
    .service('thumbnailPlayerService', ThumbnailPlayerService)
    .service('genericUtilityService', GenericUtilityService)
    .filter('capitalize', capitalizeFilter);
