export class BookmarkHttpService {

    constructor($http, authenticatorService) {
        'ngInject';
        this.$http = $http;
        this.authenticator = authenticatorService;

        this.api = 'http://127.0.0.1:4150/api/v1/user/bookmarks';
    }

    getBookmarks() {

        const options = [this.api, this.authenticator.defaultOptions];

        return this.$http.get(...options).then(response => response.data);
    }

    addBookmark(data) {

        const options = [this.api, data, this.authenticator.defaultOptions];

        return this.$http.post(...options).then(response => response.data);
    }

    deleteBookmark(id) {

        const url = `${this.api}/${id}`;
        const options = [url, this.authenticator.defaultOptions];

        return this.$http.delete(...options).then(response => response.data);
    }
}
