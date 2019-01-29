'use strict';

(() => {

const app = angular.module('migration-sample-app');

class BookmarkController {

    constructor($rootScope, bookmarkService) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.service = bookmarkService;

        this.bookmarks = [];
    }

    $onInit() {

        this.loadBookmarks();
    }

    async loadBookmarks() {

        try {

            this.bookmarks = await this.service.getBookmarks();
        }
        catch (error) {

            console.log(error);
        }
    }

    async unfollow(bookmark) {

        try {

            await this.service.unfollow(bookmark);
            this.removeBookmark(bookmark.id);
        }
        catch (error) {

            console.log(error);
        }
    }

    removeBookmark(id) {

        const index = this.bookmarks.findIndex(_ => _.id === id);

        if (index !== -1) {

            this.bookmarks.splice(index, 1);
            this.$rootScope.$broadcast('unfollowedChannel');
        }
    }
}

app.controller('BookmarkController', BookmarkController);

})();
