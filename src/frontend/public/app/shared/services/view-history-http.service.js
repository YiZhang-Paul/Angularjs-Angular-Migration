export class ViewHistoryHttpService {

    constructor($http) {
        'ngInject';
        this.$http = $http;

        this.api = 'http://127.0.0.1:4150/api/v1/user/histories';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        this.defaultHeaders = { 'Authorization': `bearer ${this.token}` };
        this.defaultOptions = Object.freeze({ headers: this.defaultHeaders });
    }

    getHistories() {

        const options = [this.api, this.defaultOptions];

        return this.$http.get(...options).then(response => {

            return sortByTimestamp(response.data);
        });
    }

    addHistory(channel) {

        const name = channel.provider_game_name;
        const data = Object.assign({ game_name: name }, channel);
        const options = [this.api, data, this.defaultOptions];

        return this.$http.post(...options).then(response => response.data);
    }

    deleteHistory(id) {

        const url = `${this.api}/${id}`;
        const options = [url, this.defaultOptions];

        return this.$http.delete(...options).then(response => response.data);
    }

    deleteHistories() {

        const options = [this.api, this.defaultOptions];

        return this.$http.delete(...options).then(response => response.data);
    }
}

function sortByTimestamp(data) {

    return data.slice().sort((a, b) => {

        return b.timestamp - a.timestamp;
    });
}
