export class ViewHistoryHttpService {

    constructor($http) {
        'ngInject';
        this.$http = $http;

        this.api = 'http://127.0.0.1:4150/api/v1/user/histories';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        this.defaultHeaders = { 'Authorization': `bearer ${this.token}` };
        this.defaultOptions = Object.freeze({ headers: this.defaultHeaders });
    }

    sortByTimestamp(data) {

        return data.slice().sort((a, b) => {

            return b.timestamp - a.timestamp;
        });
    }

    async getHistories() {

        try {

            const url = `${this.api}/histories`;
            const response = await this.$http.get(url, this.defaultOptions);

            return this.sortByTimestamp(response.data);
        }
        catch (error) {

            console.log(error);

            return [];
        }
    }

    async deleteHistory(history) {

        try {

            const url = `${this.api}/histories/${history.id}`;

            return this.$http.delete(url, this.defaultOptions);
        }
        catch (error) {

            throw error;
        }
    }

    async deleteHistories() {

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
