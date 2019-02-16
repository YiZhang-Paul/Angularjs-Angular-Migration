import { BookmarksState } from './features/bookmark/bookmark.route';
import { ChannelsState, FeaturedState } from './features/channel/channel.route';
import { GameState } from './features/game/game.route';
import { HistoriesState } from './features/view-history/view-history.route';

export default ($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/error');

    $stateProvider
        .state('index', {

            url: '/',
            redirectTo: `index.${GameState.name}`
        })
        .state('error', {

            url: '/error',
            template: '<h1 class="page-not-found">Page Not Found</h1>'
        })
        .state(`index.${GameState.name}`, GameState.state)
        .state(`index.${ChannelsState.name}`, ChannelsState.state)
        .state(`index.${FeaturedState.name}`, FeaturedState.state)
        .state(`index.${BookmarksState.name}`, BookmarksState.state)
        .state(`index.${HistoriesState.name}`, HistoriesState.state);
}
