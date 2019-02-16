export class ViewHistoryHttpService {

    constructor($http, authenticatorService) {
        'ngInject';
        this.$http = $http;
        this.authenticator = authenticatorService;

        this.api = 'http://127.0.0.1:4150/api/v1/user/histories';
    }

    _sortByTimestamp(data) {

        return data.slice().sort((a, b) => {

            return b.timestamp - a.timestamp;
        });
    }

    getHistories() {

        const options = [this.api, this.authenticator.defaultOptions];

        return this.$http.get(...options).then(response => {

            return this._sortByTimestamp(response.data);
        });
    }

    addHistory(channel) {

        const name = channel.provider_game_name;
        const data = Object.assign({ game_name: name }, channel);
        const options = [this.api, data, this.authenticator.defaultOptions];

        return this.$http.post(...options).then(response => response.data);
    }

    deleteHistory(id) {

        const url = `${this.api}/${id}`;
        const options = [url, this.authenticator.defaultOptions];

        return this.$http.delete(...options).then(response => response.data);
    }

    deleteHistories() {

        const options = [this.api, this.authenticator.defaultOptions];

        return this.$http.delete(...options).then(response => response.data);
    }
}
