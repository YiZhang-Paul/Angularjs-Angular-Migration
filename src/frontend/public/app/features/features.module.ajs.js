import BookmarkModule from './bookmark/bookmark.module.ajs';
import ChannelModule from './channel/channel.module.ajs';
import GameModule from './game/game.module.ajs';
import ViewHistoryModule from './view-history/view-history.module.ajs';

const moduleName = 'sample-app-features';

export default moduleName;

angular.module(moduleName, [

    BookmarkModule,
    ChannelModule,
    GameModule,
    ViewHistoryModule
]);
