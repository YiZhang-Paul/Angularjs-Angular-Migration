import { findByProperties, hasOwnProperties } from '../../shared/utilities/utilities';

export class BookmarkService {

    constructor($http) {
        'ngInject';
        this.$http = $http;

        this.api = 'http://127.0.0.1:4150/api/v1/user/bookmarks';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        this.defaultHeaders = { 'Authorization': `bearer ${this.token}` };
        this.defaultOptions = Object.freeze({ headers: this.defaultHeaders });

        this.bookmarks = [];
        this.cacheBookmarks();
    }

    cacheBookmarks() {

        return this.getBookmarks().then(response => this.bookmarks = response);
    }

    getBookmarks() {

        const options = [this.api, this.defaultOptions];

        return this.$http.get(...options)
            .then(response => response.data)
            .catch(error => {

                console.log(error);

                return [];
            });
    }

    isFollowed(data) {

        return !!findBookmark(this.bookmarks, data);
    }

    follow(data) {

        const options = [this.api, data, this.defaultOptions];

        return this.$http.post(...options).then(response => {

            return this.cacheBookmarks().then(() => response.data);
        });
    }

    unfollow(data) {

        const id = getBookmarkId(this.bookmarks, data);
        const url = `${this.api}/${id}`;
        const options = [url, this.defaultOptions];

        return this.$http.delete(...options).then(response => {

            return this.cacheBookmarks().then(() => response.data);
        });
    }
}

function findBookmark(bookmarks, data) {

    const keys = ['provider_id', 'provider_channel_id'];

    if (hasOwnProperties(data, keys)) {

        return findByProperties(bookmarks, data, keys);
    }

    if (data.hasOwnProperty('channel_id')) {

        return findByProperties(bookmarks, data, ['channel_id']);
    }

    return null;
}

function getBookmarkId(bookmarks, data) {

    const bookmark = findBookmark(bookmarks, data);

    return bookmark ? bookmark.id : -1;
}
