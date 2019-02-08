import './view-history.css';

export class ViewHistory {

    constructor(

        $q,
        $state,
        gameHttpService,
        channelHttpService,
        viewHistoryService,
        genericUtilityService

    ) {
        'ngInject';
        this.$q = $q;
        this.$state = $state;
        this.gameHttpService = gameHttpService;
        this.channelHttpService = channelHttpService;
        this.historyService = viewHistoryService;
        this.utilities = genericUtilityService;
    }

    get histories() {

        return this.historyService.histories;
    }

    $onInit() {

        this.historyService.cacheHistories();
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

export const ViewHistoryComponent = {

    templateUrl: 'app/components/view-history/view-history.html',
    controller: ViewHistory
};
