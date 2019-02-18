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
    }

    unfollow(bookmark) {

        this.bookmarkManager.unfollow(bookmark).catch(error => console.log(error));
    }
}

export const BookmarkListComponent = {

    templateUrl: 'app/features/bookmark/bookmark-list/bookmark-list.html',
    controller: BookmarkListController
};
