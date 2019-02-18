import './bookmark-list.scss';

export class BookmarkListController {

    constructor($scope, bookmarkManagerService) {
        'ngInject';
        this.$scope = $scope;
        this.bookmarkManager = bookmarkManagerService;
    }

    get bookmarks() {

        return this.bookmarkManager.bookmarks;
    }

    $onInit() {

        this.bookmarkManager.cacheBookmarks();
        this._registerAuthenticationEvents();
    }

    _registerAuthenticationEvents() {

        this.$scope.$on('userAuthenticated', () => {

            this.bookmarkManager.cacheBookmarks();
        });

        this.$scope.$on('userLoggedOut', () => {

            this.bookmarkManager.bookmarks = [];
        });
    }

    unfollow(bookmark) {

        this.bookmarkManager.unfollow(bookmark).catch(error => console.log(error));
    }
}

export const BookmarkListComponent = {

    templateUrl: 'app/features/bookmark/bookmark-list/bookmark-list.html',
    controller: BookmarkListController
};
