export class BookmarkController {

    constructor($rootScope, bookmarkService) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.service = bookmarkService;

        this.bookmarks = [];
    }

    $onInit() {

        this.loadBookmarks();
    }

    loadBookmarks() {

        this.service.getBookmarks()
            .then(bookmarks => this.bookmarks = bookmarks)
            .catch(() => null);
    }

    unfollow(bookmark) {

        this.service.unfollow(bookmark)
            .then(() => this.removeBookmark(bookmark.id))
            .catch(error => console.log(error));
    }

    removeBookmark(id) {

        const index = this.bookmarks.findIndex(_ => _.id === id);

        if (index !== -1) {
            // TODO: reconsider scope.emit + rootScope.on vs rootScope.broadcast + scope.on
            this.bookmarks.splice(index, 1);
            this.$rootScope.$broadcast('unfollowedChannel');
        }
    }
}
