import { BookmarksState } from './components/bookmark/bookmark.route';
import { ChannelsState, FeaturedState } from './components/channel/channel.route';
import { GameListState } from './components/game-list/game-list.route';
import { HistoriesState } from './components/view-history/view-history.route';

export default ($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/error');

    $stateProvider
        .state('index', {

            url: '/',
            redirectTo: `index.${GameListState.name}`
        })
        .state('error', {

            url: '/error',
            templateUrl: './app/error.html'
        })
        .state(`index.${GameListState.name}`, GameListState.state)
        .state(`index.${ChannelsState.name}`, ChannelsState.state)
        .state(`index.${FeaturedState.name}`, FeaturedState.state)
        .state(`index.${BookmarksState.name}`, BookmarksState.state)
        .state(`index.${HistoriesState.name}`, HistoriesState.state);
}
