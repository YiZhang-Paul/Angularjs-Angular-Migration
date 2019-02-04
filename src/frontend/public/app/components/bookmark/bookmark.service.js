export class BookmarkService {

    constructor($rootScope, bookmarkHttpService, genericUtilityService) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.service = bookmarkHttpService;
        this.utilities = genericUtilityService;

        this.bookmarks = [];
    }

    getBookmarks() {

        return this.service.getBookmarks().catch(error => {

            console.log(error);

            return [];
        });
    }

    cacheBookmarks() {

        return this.getBookmarks().then(bookmarks => {

            this.bookmarks = bookmarks;
        });
    }

    _findBookmark(data) {

        const channelKeys = ['channel_id'];
        const providerKeys = ['provider_id', 'provider_channel_id'];
        const hasChannelId = data.hasOwnProperty(channelKeys[0]);
        const hasProvider = this.utilities.hasOwnProperties(data, providerKeys);

        if (!hasChannelId && !hasProvider) {

            return null;
        }

        const keys = hasChannelId ? channelKeys : providerKeys;

        return this.utilities.findByProperties(this.bookmarks, data, keys);
    }

    _getBookmarkId(data) {

        const bookmark = this._findBookmark(data);

        return bookmark ? bookmark.id : -1;
    }

    isFollowed(data) {

        return this._getBookmarkId(data) !== -1;
    }

    follow(data) {

        return this.service.addBookmark(data).then(() => {

            this.$rootScope.$broadcast('followedChannel');

            return this.cacheBookmarks();
        });
    }

    _removeCached(id) {

        const index = this.bookmarks.findIndex(_ => _.id === id);
        this.bookmarks.splice(index, 1);
    }

    unfollow(data) {

        const id = this._getBookmarkId(data);

        return this.service.deleteBookmark(id).then(() => {

            this._removeCached(id);
            this.$rootScope.$broadcast('unfollowedChannel');
        });
    }
}
