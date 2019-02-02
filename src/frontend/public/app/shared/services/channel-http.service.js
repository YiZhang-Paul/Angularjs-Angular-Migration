export class ChannelHttpService {

    constructor($http) {
        'ngInject';
        this.$http = $http;

        this.api = 'http://127.0.0.1:4150/api/v1/games/:id/channels';
    }

    getChannelsByGameId(id) {

        const url = this.api.replace(':id', id);

        return this.$http.get(url).then(response => response.data);
    }
}
