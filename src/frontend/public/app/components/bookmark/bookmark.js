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
            .catch(() => this.bookmarks = []);
    }
    // TODO: reconsider scope.emit + rootScope.on vs rootScope.broadcast + scope.on
    unfollow(bookmark) {

        this.service.unfollow(bookmark)
            .then(() => removeCached(this.bookmarks, bookmark.id))
            .then(() => this.$rootScope.$broadcast('unfollowedChannel'))
            .catch(error => console.log(error));
    }
}

function removeCached(cache, id) {

    const index = cache.findIndex(_ => _.id === id);

    if (index !== -1) {

        cache.splice(index, 1);
    }
}
