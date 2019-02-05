import { BookmarkComponent } from './bookmark/bookmark.component';
import { ChannelBadgeComponent } from './channel/channel-badge/channel-badge.component';
import { FeaturedChannelComponent } from './channel/featured-channel/featured-channel.component';
import { ViewHistoryComponent } from './view-history/view-history.component';

import { ChannelController } from './channel/channel';
import { GameController } from './game/game';

import { BookmarkService } from './bookmark/bookmark.service';
import { ChannelService } from './channel/channel.service';
import { FeaturedChannelService } from './channel/featured-channel/featured-channel.service';
import { GameService } from './game/game.service';
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
    .component('bookmark', BookmarkComponent)
    .component('channelBadge', ChannelBadgeComponent)
    .component('featuredChannel', FeaturedChannelComponent)
    .component('viewHistory', ViewHistoryComponent)
    .controller('ChannelController', ChannelController)
    .controller('GameController', GameController)
    .service('bookmarkService', BookmarkService)
    .service('channelService', ChannelService)
    .service('featuredChannelService', FeaturedChannelService)
    .service('gameService', GameService)
    .service('viewHistoryService', ViewHistoryService);
