export class BookmarkManagerService {

    constructor($rootScope, toastr, bookmarkHttpService) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.toastr = toastr;
        this.bookmarkHttp = bookmarkHttpService;

        this.providerKeys = ['provider_id', 'provider_channel_id'];

        this.bookmarks = [];
    }

    cacheBookmarks() {

        return this.bookmarkHttp.getBookmarks().catch(error => {

            console.log(error);

            return [];
        })
        .then(bookmarks => this.bookmarks = bookmarks)
        .then(() => this.$rootScope.$broadcast('bookmarkCached'));
    }

    _findBookmarkByChannelId(data) {

        return this.bookmarks.find(_ => _.channel_id === data.channel_id);
    }

    _findBookmarkByProvider(data) {

        return this.bookmarks.find(_ => {

            return this.providerKeys.every(key => _[key] === data[key]);
        });
    }

    _findBookmark(data) {

        if (data.hasOwnProperty('channel_id')) {

            return this._findBookmarkByChannelId(data);
        }

        if (this.providerKeys.every(key => data.hasOwnProperty(key))) {

            return this._findBookmarkByProvider(data);
        }

        return null;
    }

    _getBookmarkId(data) {

        const bookmark = this._findBookmark(data);

        return bookmark ? bookmark.id : -1;
    }

    isFollowed(data) {

        return this._getBookmarkId(data) !== -1;
    }

    follow(data) {

        const message = 'You just followed a channel.';

        return this.bookmarkHttp.addBookmark(data)
            .then(() => this.cacheBookmarks())
            .then(() => this.$rootScope.$broadcast('followedChannel'))
            .then(() => this.toastr.success(message, { timeOut: 2500 }))
            .catch(error => console.log(error));
    }

    _removeCached(id) {

        const index = this.bookmarks.findIndex(_ => _.id === id);
        this.bookmarks.splice(index, 1);
    }

    unfollow(data) {

        const id = this._getBookmarkId(data);
        const message = 'You just unfollowed a channel.';

        return this.bookmarkHttp.deleteBookmark(id).then(() => {

            this._removeCached(id);
            this.$rootScope.$broadcast('unfollowedChannel');
            this.toastr.error(message, { timeOut: 2500 });
        })
        .catch(error => console.log(error));
    }
}
