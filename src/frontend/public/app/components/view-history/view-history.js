export class ViewHistoryController {
    // TODO: create service
    constructor(

        $q,
        $state,
        $mdDialog,
        gameHttpService,
        channelHttpService,
        viewHistoryHttpService,
        genericUtilityService

    ) {
        'ngInject';
        this.$q = $q;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.gameService = gameHttpService;
        this.channelService = channelHttpService;
        this.historyService = viewHistoryHttpService;
        this.utilities = genericUtilityService;

        this.histories = [];
    }

    $onInit() {

        this._loadHistories();
    }

    _loadHistories() {

        this.historyService.getHistories().then(histories => {

            this.histories = histories;
        })
        .catch(error => console.log(error));
    }

    isStaticImage(url) {

        return !/(mp4|m4v)$/i.test(url);
    }

    _changeRoute(game, channels) {

        const name = this.utilities.joinText(game.name);

        this.$state.go('channels', { game, name, channels });
    }

    toChannelsView(id) {

        const gamePromise = this.gameService.getGame(id);
        const channelsPromise = this.channelService.getChannelsByGameId(id);

        this.$q.all([gamePromise, channelsPromise]).then(responses => {

            this._changeRoute(...responses);
        })
        .catch(error => console.log(error));
    }

    deleteHistory(history) {

        const id = history.id;
        const index = this.histories.findIndex(_ => _.id === id);

        if (index !== -1) {

            this.histories.splice(index, 1);
            this.historyService.deleteHistory(id).catch(() => null);
        }
    }

    clearHistories() {

        this.historyService.deleteHistories().then(() => {

            this.histories = [];
        })
        .catch(error => console.log(error));
    }

    _showConfirmationDialog(event) {

        const options = this.$mdDialog.confirm()
            .title('Clear all view histories?')
            .textContent('All view histories will be permanently deleted.')
            .targetEvent(event)
            .ok('Ok')
            .cancel('Cancel');

        return this.$mdDialog.show(options);
    }

    confirmClearHistories(event) {

        this._showConfirmationDialog(event).then(() => {

            this.clearHistories();
        })
        .catch(() => null);
    }
}
