import { ChannelBadgeComponent } from './channel/channel-badge/channel-badge.component';

import { BookmarkController } from './bookmark/bookmark';
import { ChannelController } from './channel/channel';
import { FeaturedChannelController } from './channel/featured-channel/featured-channel';
import { GameController } from './game/game';
import { ViewHistoryController } from './view-history/view-history';

import { BookmarkService } from './bookmark/bookmark.service';
import { ChannelService } from './channel/channel.service';
import { ViewHistoryService } from './view-history/view-history.service';

import BookmarkRoute from './bookmark/bookmark.route';
import ChannelRoute from './channel/channel.route';
import GameRoute from './game/game.route';
import ViewHistoryRoute from './view-history/view-history.route';

const moduleName = 'sample-app-components';

export default moduleName;

angular.module(moduleName, ['ui.router', 'ngMaterial'])
    .config(BookmarkRoute)
    .config(ChannelRoute)
    .config(GameRoute)
    .config(ViewHistoryRoute)
    .component('channelBadge', ChannelBadgeComponent)
    .controller('BookmarkController', BookmarkController)
    .controller('ChannelController', ChannelController)
    .controller('FeaturedChannelController', FeaturedChannelController)
    .controller('GameController', GameController)
    .controller('ViewHistoryController', ViewHistoryController)
    .service('bookmarkService', BookmarkService)
    .service('channelService', ChannelService)
    .service('viewHistoryService', ViewHistoryService);
