import { UIRouter } from '@uirouter/angular';

import { BookmarksState } from './features/bookmark/bookmark.route';
import { ChannelsState, FeaturedState } from './features/channel/channel.route';
import { GameState } from './features/game/game.route';
import { HistoriesState } from './features/view-history/view-history.route';
import { ErrorComponent } from './error.component';

const states = [

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

const config = (router: UIRouter) => {

    router.urlService.rules.otherwise({ state: 'error' });
};

export const routeSetup = { states, useHash: false, config };
