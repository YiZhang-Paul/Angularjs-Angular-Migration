import { Injectable } from '@angular/core';

import { $rootScope } from '../../../upgraded-providers/$rootScope-provider/$rootScope-provider';
import { Toastr } from '../../../upgraded-providers/toastr-provider/toastr-provider';
import { BookmarkHttpService } from '../../../services/http/bookmark-http/bookmark-http.service';

@Injectable({
    providedIn: 'root'
})
export class BookmarkManagerService {

    public bookmarks = [];

    private readonly _providerKeys = ['provider_id', 'provider_channel_id'];

    private _$rootScope: $rootScope;
    private _toastr: Toastr;
    private _bookmarkHttp: BookmarkHttpService;

    constructor(

        $rootScope: $rootScope,
        toastr: Toastr,
        bookmarkHttp: BookmarkHttpService

    ) {
        this._$rootScope = $rootScope;
        this._toastr = toastr;
        this._bookmarkHttp = bookmarkHttp;
    }

    public cacheBookmarks() {

        return this._bookmarkHttp.getBookmarks().catch(error => {

            console.log(error);

            return [];
        })
        .then(bookmarks => this.bookmarks = bookmarks)
        .then(() => this._$rootScope.$broadcast('bookmarkCached'));
    }

    private findBookmarkByChannelId(data) {

        return this.bookmarks.find(_ => _.channel_id === data.channel_id);
    }

    private findBookmarkByProvider(data) {

        return this.bookmarks.find(_ => {

            return this._providerKeys.every(key => _[key] === data[key]);
        });
    }

    private findBookmark(data) {

        if (data.hasOwnProperty('channel_id')) {

            return this.findBookmarkByChannelId(data);
        }

        if (this._providerKeys.every(key => data.hasOwnProperty(key))) {

            return this.findBookmarkByProvider(data);
        }

        return null;
    }

    private getBookmarkId(data) {

        const bookmark = this.findBookmark(data);

        return bookmark ? bookmark.id : -1;
    }

    public isFollowed(data) {

        return this.getBookmarkId(data) !== -1;
    }

    public follow(data) {

        const message = 'You just followed a channel.';

        return this._bookmarkHttp.addBookmark(data)
            .then(() => this.cacheBookmarks())
            .then(() => this._$rootScope.$broadcast('followedChannel'))
            .then(() => this._toastr.success(message, { timeOut: 2500 }))
            .catch(error => console.log(error));
    }

    private removeCached(id) {

        const index = this.bookmarks.findIndex(_ => _.id === id);
        this.bookmarks.splice(index, 1);
    }

    public unfollow(data) {

        const id = this.getBookmarkId(data);
        const message = 'You just unfollowed a channel.';

        return this._bookmarkHttp.deleteBookmark(id).then(() => {

            this.removeCached(id);
            this._$rootScope.$broadcast('unfollowedChannel');
            this._toastr.error(message, { timeOut: 2500 });
        })
        .catch(error => console.log(error));
    }
}
