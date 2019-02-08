import { BookmarkComponent } from './bookmark/bookmark.component';
import { BookmarkCardComponent } from './bookmark/bookmark-card/bookmark-card.component';
import { ChannelComponent } from './channel/channel.component';
import { ChannelCardComponent } from './channel/channel-card/channel-card.component';
import { ChannelBadgeComponent } from './channel/channel-badge/channel-badge.component';
import { FeaturedChannelComponent } from './channel/featured-channel/featured-channel.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameCardComponent } from './game-list/game-card/game-card.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { ViewHistoryCardComponent } from './view-history/view-history-card/view-history-card.component';

import { BookmarkService } from './bookmark/bookmark.service';
import { ChannelService } from './channel/channel.service';
import { FeaturedChannelService } from './channel/featured-channel/featured-channel.service';
import { GameListService } from './game-list/game-list.service';
import { ViewHistoryService } from './view-history/view-history.service';

const moduleName = 'sample-app-components';

export default moduleName;

angular.module(moduleName, ['ui.router', 'ngMaterial'])
    .component('bookmark', BookmarkComponent)
    .component('bookmarkCard', BookmarkCardComponent)
    .component('channel', ChannelComponent)
    .component('channelCard', ChannelCardComponent)
    .component('channelBadge', ChannelBadgeComponent)
    .component('featuredChannel', FeaturedChannelComponent)
    .component('gameList', GameListComponent)
    .component('gameCard', GameCardComponent)
    .component('viewHistory', ViewHistoryComponent)
    .component('viewHistoryCard', ViewHistoryCardComponent)
    .service('bookmarkService', BookmarkService)
    .service('channelService', ChannelService)
    .service('featuredChannelService', FeaturedChannelService)
    .service('gameListService', GameListService)
    .service('viewHistoryService', ViewHistoryService);
