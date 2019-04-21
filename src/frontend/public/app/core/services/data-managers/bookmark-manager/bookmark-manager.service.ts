import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BookmarkHttpService } from '../../../services/http/bookmark-http/bookmark-http.service';
import { EventManagerService } from '../../../services/events/event-manager.service';

@Injectable({
    providedIn: 'root'
})
export class BookmarkManagerService {

    public bookmarks: any[] = [];

    private readonly _providerKeys = ['provider_id', 'provider_channel_id'];

    private _toastr: ToastrService;
    private _bookmarkHttp: BookmarkHttpService;
    private _eventManager: EventManagerService;

    constructor(

        toastr: ToastrService,
        bookmarkHttp: BookmarkHttpService,
        eventManager: EventManagerService

    ) {

        this._toastr = toastr;
        this._bookmarkHttp = bookmarkHttp;
        this._eventManager = eventManager;
    }

    public async cacheBookmarks(): Promise<void> {

        try {

            this.bookmarks = await this._bookmarkHttp.getBookmarks();
        }
        catch (error) {

            this.bookmarks = [];
            console.log(error);
        }

        this._eventManager.emit('bookmarkCached');
    }

    private findBookmarkByChannelId(data: any): any {

        return this.bookmarks.find(_ => _.channel_id === data.channel_id);
    }

    private findBookmarkByProvider(data: any): any {

        return this.bookmarks.find(_ => {

            return this._providerKeys.every(key => _[key] === data[key]);
        });
    }

    private findBookmark(data: any): any {

        if (data.hasOwnProperty('channel_id')) {

            return this.findBookmarkByChannelId(data);
        }

        if (this._providerKeys.every(key => data.hasOwnProperty(key))) {

            return this.findBookmarkByProvider(data);
        }

        return null;
    }

    private getBookmarkId(data: any): number {

        const bookmark = this.findBookmark(data);

        return bookmark ? bookmark.id : -1;
    }

    public isFollowed(data: any): boolean {

        return this.getBookmarkId(data) !== -1;
    }

    public async follow(data: any): Promise<void> {

        try {

            await this._bookmarkHttp.addBookmark(data);
            await this.cacheBookmarks();
            this._eventManager.emit('followedChannel');
            this._toastr.success('You just followed a channel.');
        }
        catch (error) {

            console.log(error);
        }
    }

    private removeCached(id: number): void {

        const index = this.bookmarks.findIndex(_ => _.id === id);
        this.bookmarks.splice(index, 1);
    }

    public async unfollow(data: any): Promise<void> {

        try {

            const id = this.getBookmarkId(data);
            await this._bookmarkHttp.deleteBookmark(id);
            this.removeCached(id);
            this._eventManager.emit('unfollowedChannel');
            this._toastr.error('You just unfollowed a channel.');
        }
        catch (error) {

            console.log(error);
        }
    }
}
