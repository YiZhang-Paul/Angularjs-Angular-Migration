export class GameHttpService {

    constructor($http) {
        'ngInject';
        this.$http = $http;

        this.api = 'http://127.0.0.1:4150/api/v1/games';
    }

    getGame(id) {

        const url = `${this.api}/${id}`;

        return this.$http.get(url).then(response => {

            return response.data[0] ? response.data[0] : null;
        });
    }

    getGameByName(name) {

        return this.getGames().then(games => {

            const game = games.find(_ => _.name === name);

            return game ? game : null;
        });
    }

    getGames() {

        return this.$http.get(this.api).then(response => response.data);
    }
}
