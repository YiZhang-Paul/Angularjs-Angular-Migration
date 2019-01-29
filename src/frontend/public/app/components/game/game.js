'use strict';

(() => {

const app = angular.module('migration-sample-app');

class GameListController {

    constructor($interval, $http, $state, gameService) {
        'ngInject';
        this.$interval = $interval;
        this.$http = $http;
        this.$state = $state;
        this.service = gameService;

        this.games = [];
        this.interval = null;
    }

    $onInit() {

        this.loadGames();
        const callback = this.loadGames.bind(this);
        this.interval = this.$interval(callback, 10 * 1000);
    }

    async loadGames() {

        this.syncGames(await this.getGames());
    }

    async getGames() {

        try {

            return this.service.getGames();
        }
        catch (error) {

            return [];
        }
    }

    syncGames(games) {

        for (let i = 0; i < games.length; i++) {

            if (this.games[i] && this.games[i].id === games[i].id) {

                this.games[i].view_count = games[i].view_count;

                continue;
            }

            this.games[i] = games[i];
        }
    }

    joinWords(words) {

        return words.replace(/\s/g, '-');
    }

    async toChannelsView(game) {

        try {

            const url = `http://127.0.0.1:4150/${game.channels}`;
            const response = await this.$http.get(url);
            const channels = response.data;
            const name = this.joinWords(game.name);

            this.$state.go('channels', { name, game, channels });
            this.$interval.cancel(this.interval);
        }
        catch (error) {

            console.log(error);
        }
    }
}

app.controller('GameListController', GameListController);

})();
