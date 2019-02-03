import { findByProperties, hasOwnProperties } from '../../shared/utilities/utilities';

export class BookmarkService {

    constructor(bookmarkHttpService) {
        'ngInject';
        this.service = bookmarkHttpService;
        // TODO: bookmark controller should reference this cache
        this.bookmarks = [];
        this.cacheBookmarks();
    }

    cacheBookmarks() {

        return this.getBookmarks().then(bookmarks => {

            this.bookmarks = bookmarks;
        });
    }

    getBookmarks() {

        return this.service.getBookmarks().catch(error => {

            console.log(error);

            return [];
        });
    }

    isFollowed(data) {

        return getBookmarkId(this.bookmarks, data) !== -1;
    }

    follow(data) {

        return this.service.addBookmark(data).then(() => {

            return this.cacheBookmarks();
        });
    }

    unfollow(data) {

        const id = getBookmarkId(this.bookmarks, data);

        return this.service.deleteBookmark(id).then(() => {

            return this.cacheBookmarks();
        });
    }
}

function findBookmark(bookmarks, data) {

    const keys = ['provider_id', 'provider_channel_id'];

    if (hasOwnProperties(data, keys)) {

        return findByProperties(bookmarks, data, keys);
    }

    if (data.hasOwnProperty('channel_id')) {

        return findByProperties(bookmarks, data, ['channel_id']);
    }

    return null;
}

function getBookmarkId(bookmarks, data) {

    const bookmark = findBookmark(bookmarks, data);

    return bookmark ? bookmark.id : -1;
}
