export class ViewHistoryController {

    constructor($http, $state, $mdDialog, gameHttpService, viewHistoryHttpService) {
        'ngInject';
        this.$http = $http;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.gameService = gameHttpService;
        this.historyService = viewHistoryHttpService;

        this.api = 'http://127.0.0.1:4150';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        this.defaultHeaders = { 'Authorization': `bearer ${this.token}` };
        this.defaultOptions = Object.freeze({ headers: this.defaultHeaders });

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

    joinWords(words) {

        return words.replace(/\s/g, '-');
    }

    async getChannels(id) {

        try {

            const game = await this.gameService.getGame(id);
            const name = this.joinWords(game.name);
            const url = `${this.api}/${game.channels}`;
            const response = await this.$http.get(url);
            const channels = response.data;

            this.$state.go('channels', { game, name, channels });
        }
        catch (error) {

            console.log(error);
        }
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

function showConfirmationDialog($mdDialog, event) {

    const options = $mdDialog.confirm()
        .title('Clear all view histories?')
        .textContent('All view histories will be permanently deleted.')
        .targetEvent(event)
        .ok('Ok')
        .cancel('Cancel');

    return $mdDialog.show(options);
}
