'use strict';

(() => {

const app = angular.module('migration-sample-app');

class ViewHistoryController {

    constructor($http, $state, $mdDialog, sidebarService, gameService) {
        'ngInject';
        this.$http = $http;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.sidebarService = sidebarService;
        this.gameService = gameService;

        this.api = 'http://127.0.0.1:4150';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        this.defaultHeaders = { 'Authorization': `bearer ${this.token}` };
        this.defaultOptions = Object.freeze({ headers: this.defaultHeaders });

        this.histories = [];
    }

    $onInit() {

        this.loadHistories();
    }

    async loadHistories() {

        try {

            this.histories = await this.sidebarService.getHistories();
        }
        catch (error) {

            console.log(error);
        }
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

        const index = this.histories.findIndex(_ => _.id === history.id);

        if (index !== -1) {

            this.histories.splice(index, 1);
        }

        this.sidebarService.deleteHistory(history).catch(() => null);
    }

    async confirmClearHistory(event) {

        const confirm = this.$mdDialog.confirm()
            .title('Clear all view histories?')
            .textContent('All view histories will be permanently deleted.')
            .targetEvent(event)
            .ok('Ok')
            .cancel('Cancel');

        await this.$mdDialog.show(confirm);
        this.clearHistories();
    }

    async clearHistories() {

        try {

            const url = `${this.api}/api/v1/user/histories`;
            await this.$http.delete(url, this.defaultOptions);
            this.histories = [];
        }
        catch (error) {

            console.log(error);
        }
    }
}

app.controller('ViewHistoryController', ViewHistoryController);

})();
