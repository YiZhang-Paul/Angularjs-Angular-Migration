import './view-history-list.scss';

export class ViewHistoryListController {

    constructor(

        $q,
        $scope,
        $state,
        gameHttpService,
        channelHttpService,
        viewHistoryManagerService,
        genericUtilitiesService

    ) {
        'ngInject';
        this.$q = $q;
        this.$scope = $scope;
        this.$state = $state;
        this.gameHttpService = gameHttpService;
        this.channelHttpService = channelHttpService;
        this.historyService = viewHistoryManagerService;
        this.utilities = genericUtilitiesService;
    }

    get histories() {

        return this.historyService.histories;
    }

    $onInit() {

        this.historyService.cacheHistories();
        this._registerAuthenticationEvents();
    }

    _registerAuthenticationEvents() {

        this.$scope.$on('userAuthenticated', () => {

            this.historyService.cacheHistories();
        });

        this.$scope.$on('userLoggedOut', () => {

            this.historyService.histories = [];
        });
    }

    isStaticImage(url) {

        return !/(mp4|m4v)$/i.test(url);
    }

    _changeRoute(game, channels) {

        const name = this.utilities.joinText(game.name);

        this.$state.go('index.channels', { game, name, channels });
    }

    toChannelsView(id) {

        const gamePromise = this.gameHttpService.getGame(id);
        const channelsPromise = this.channelHttpService.getChannelsByGameId(id);
        const promises = [gamePromise, channelsPromise];

        this.$q.all(promises).then(responses => {

            this._changeRoute(...responses);
        })
        .catch(error => console.log(error));
    }

    deleteHistory(history) {

        this.historyService.deleteHistory(history.id);
    }

    confirmClearHistories(event) {

        this.historyService.showClearHistoriesDialog(event).then(() => {

            return this.historyService.clearHistories();
        })
        .catch(error => console.log(error));
    }
}

export const ViewHistoryListComponent = {

    templateUrl: 'app/features/view-history/view-history-list/view-history-list.html',
    controller: ViewHistoryListController
};
