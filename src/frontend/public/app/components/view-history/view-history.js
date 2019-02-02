import { joinText } from '../../shared/utilities/utilities';

export class ViewHistoryController {
    // TODO: create service
    constructor($q, $state, $mdDialog, gameHttpService, channelHttpService, viewHistoryHttpService) {
        'ngInject';
        this.$q = $q;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.gameService = gameHttpService;
        this.channelService = channelHttpService;
        this.historyService = viewHistoryHttpService;

        this.histories = [];
    }

    $onInit() {

        this.loadHistories();
    }

    loadHistories() {

        this.historyService.getHistories()
            .then(histories => this.histories = histories)
            .catch(error => console.log(error));
    }

    isStaticImage(url) {

        return !/(mp4|m4v)$/i.test(url);
    }

    toChannelsView(id) {

        const gamePromise = this.gameService.getGame(id);
        const channelsPromise = this.channelService.getChannelsByGameId(id);

        this.$q.all([gamePromise, channelsPromise])
            .then(responses => changeRoute(this.$state, ...responses))
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

        this.historyService.deleteHistories()
            .then(() => this.histories = [])
            .catch(error => console.log(error));
    }

    confirmClearHistories(event) {

        showConfirmationDialog(this.$mdDialog, event)
            .then(() => this.clearHistories())
            .catch(() => null);
    }
}

function changeRoute($state, game, channels) {

    const name = joinText(game.name);

    $state.go('channels', { game, name, channels });
}

function showConfirmationDialog($mdDialog, event) {

    const options = $mdDialog.confirm()
        .title('Clear all view histories?')
        .textContent('All view histories will be permanently deleted.')
        .targetEvent(event)
        .ok('Ok')
        .cancel('Cancel');

    return $mdDialog.show(options);
}
