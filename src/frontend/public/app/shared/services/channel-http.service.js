export class ChannelHttpService {

    constructor($http) {
        'ngInject';
        this.$http = $http;

        this.baseApi = 'http://127.0.0.1:4150/api/v1';
    }

    getChannels() {

        const url = `${this.baseApi}/channels`;

        return this.$http.get(url).then(response => response.data);
    }

    getChannelsByGameId(id) {

        const url = `${this.baseApi}/games/${id}/channels`;

        return this.$http.get(url).then(response => response.data);
    }
}
