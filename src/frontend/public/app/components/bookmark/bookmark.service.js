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
        this.getBookmarks();
    }

    getBookmarks() {

        return this.$http.get(this.api, this.defaultOptions)
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

        return this.$http.post(this.api, data, this.defaultOptions)
            .then(response => {

                return this.getBookmarks().then(bookmarks => {

                    this.bookmarks = bookmarks;

                    return response.data;
                });
            });
    }

    unfollow(data) {

        const id = getBookmarkId(this.bookmarks, data);
        const url = `${this.api}/${id}`;

        return this.$http.delete(url, this.defaultOptions).then(response => {

            return this.getBookmarks().then(bookmarks => {

                this.bookmarks = bookmarks;

                return response.data;
            });
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
