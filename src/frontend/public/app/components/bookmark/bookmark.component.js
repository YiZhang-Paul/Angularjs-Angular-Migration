import './bookmark.css';

export class Bookmark {

    constructor(bookmarkService) {
        'ngInject';
        this.service = bookmarkService;
    }

    get bookmarks() {

        return this.service.bookmarks;
    }

    $onInit() {

        this.service.cacheBookmarks();
    }

    unfollow(bookmark) {

        this.service.unfollow(bookmark).catch(error => console.log(error));
    }
}

export const BookmarkComponent = {

    templateUrl: 'app/components/bookmark/bookmark.html',
    controller: Bookmark
};
