import './bookmark.scss';

export class Bookmark {

    constructor($scope, bookmarkService) {
        'ngInject';
        this.$scope = $scope;
        this.service = bookmarkService;
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

export const BookmarkComponent = {

    templateUrl: 'app/components/bookmark/bookmark.html',
    controller: Bookmark
};
