export class GameService {

    constructor($http) {
        'ngInject';
        this.$http = $http;

        this.api = 'http://127.0.0.1:4150/api/v1/games';
    }

    getGame(id) {

        const url = `${this.api}/${id}`;

        return this.$http.get(url)
            .then(response => response.data[0]);
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
