import { BookmarksState } from './features/bookmark/bookmark.route';
import { ChannelsState, FeaturedState } from './features/channel/channel.route';
import { GameState } from './features/game/game.route';
import { HistoriesState } from './features/view-history/view-history.route';

export const states = [

    {
        name: 'index',
        url: '/',
        redirectTo: GameState.name
    },
    {
        name: 'error',
        url: '/error',
        template: '<h1 class="page-not-found">Page Not Found</h1>'
    },
    GameState,
    ChannelsState,
    FeaturedState,
    BookmarksState,
    HistoriesState
];
