import './bookmark-list.scss';

export class BookmarkListController {

    constructor($scope, bookmarkManagerService) {
        'ngInject';
        this.$scope = $scope;
        this.service = bookmarkManagerService;
    }

    get bookmarks() {

        return this.service.bookmarks;
    }

    $onInit() {

        this.service.cacheBookmarks();
        this._registerAuthenticationEvents();
    }

    _registerAuthenticationEvents() {

        this.$scope.$on('userAuthenticated', () => {

            this.service.cacheBookmarks();
        });

        this.$scope.$on('userLoggedOut', () => {

            this.service.bookmarks = [];
        });
    }

    unfollow(bookmark) {

        this.service.unfollow(bookmark).catch(error => console.log(error));
    }
}

export const BookmarkListComponent = {

    templateUrl: 'app/features/bookmark/bookmark-list/bookmark-list.html',
    controller: BookmarkListController
};
