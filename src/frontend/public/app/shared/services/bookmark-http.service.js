export class BookmarkHttpService {

    constructor($http) {
        'ngInject';
        this.$http = $http;

        this.api = 'http://127.0.0.1:4150/api/v1/user/bookmarks';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        this.defaultHeaders = { 'Authorization': `bearer ${this.token}` };
        this.defaultOptions = Object.freeze({ headers: this.defaultHeaders });
    }

    getBookmarks() {

        const options = [this.api, this.defaultOptions];

        return this.$http.get(...options).then(response => response.data);
    }

    addBookmark(data) {

        const options = [this.api, data, this.defaultOptions];

        return this.$http.post(...options).then(response => response.data);
    }

    deleteBookmark(id) {

        const url = `${this.api}/${id}`;
        const options = [url, this.defaultOptions];

        return this.$http.delete(...options).then(response => response.data);
    }
}
