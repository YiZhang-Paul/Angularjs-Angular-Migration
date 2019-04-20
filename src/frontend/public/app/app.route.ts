import { BookmarksState } from './features/bookmark/bookmark.route';
import { ChannelsState, FeaturedState } from './features/channel/channel.route';
import { GameState } from './features/game/game.route';
import { HistoriesState } from './features/view-history/view-history.route';
import { ErrorComponent } from './error.component';

export const states = [

    {
        name: 'index',
        url: '/',
        redirectTo: GameState.name
    },
    {
        name: 'error',
        url: '/error',
        component: ErrorComponent
    },
    GameState,
    ChannelsState,
    FeaturedState,
    BookmarksState,
    HistoriesState
];
