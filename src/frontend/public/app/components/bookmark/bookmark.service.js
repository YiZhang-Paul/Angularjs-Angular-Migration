'use strict';

(() => {

const app = angular.module('migration-sample-app');

class BookmarkService {

    constructor($http) {
        'ngInject';
        this.$http = $http;

        this.api = 'http://127.0.0.1:4150/api/v1/user/bookmarks';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        this.defaultHeaders = { 'Authorization': `bearer ${this.token}` };
        this.defaultOptions = Object.freeze({ headers: this.defaultHeaders });

        this.bookmarks = [];
        this.getBookmarks();
    }

    findBookmark(data) {

        return this.bookmarks.find(_ => {

            const followed = _.channel_id === data.channel_id;
            const provided = _.provider_id === data.provider_id
                          && _.provider_channel_id === data.provider_channel_id;

            return followed || provided;
        });
    }

    getBookmarkId(data) {

        const bookmark = this.findBookmark(data);

        return bookmark ? bookmark.id : -1;
    }

    async getBookmarks() {

        try {

            const response = await this.$http.get(this.api, this.defaultOptions);
            this.bookmarks = response.data;
        }
        catch (error) {

            console.log(error);
            this.bookmarks = [];
        }

        return this.bookmarks;
    }

    isFollowed(data) {

        return !!this.findBookmark(data);
    }

    async follow(data) {

        try {

            const response = await this.$http.post(this.api, data, this.defaultOptions);
            await this.getBookmarks();

            return response.data;
        }
        catch (error) {

            throw error;
        }
    }

    async unfollow(data) {

        try {

            const url = `${this.api}/${this.getBookmarkId(data)}`;
            const response = await this.$http.delete(url, this.defaultOptions);
            await this.getBookmarks();

            return response.data;
        }
        catch (error) {

            throw error;
        }
    }
}

app.service('bookmarkService', BookmarkService);

})();
