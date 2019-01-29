'use strict';

(() => {

const app = angular.module('migration-sample-app');

class GameService {

    constructor($http) {
        'ngInject';
        this.$http = $http;

        this.api = 'http://127.0.0.1:4150/api/v1/games';
    }

    async getGame(id) {

        try {

            const url = `${this.api}/${id}`;
            const response = await this.$http.get(url);

            return response.data[0];
        }
        catch (error) {

            throw error;
        }
    }

    async getGames() {

        try {

            const response = await this.$http.get(this.api);

            return response.data;
        }
        catch (error) {

            throw error;
        }
    }
}

app.service('gameService', GameService);

})();
