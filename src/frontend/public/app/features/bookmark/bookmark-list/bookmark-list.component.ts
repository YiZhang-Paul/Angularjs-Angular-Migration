import { Component, OnInit } from '@angular/core';

import { BookmarkManager } from '../../../core/upgraded-providers/bookmark-manager-provider/bookmark-manager-provider';

@Component({
    selector: 'bookmark-list',
    styles: [`${require('./bookmark-list.scss')}`],
    template: require('./bookmark-list.html')
})
export class BookmarkListComponent implements OnInit {

    private _bookmarkManager: BookmarkManager;

    constructor(bookmarkManager: BookmarkManager) {

        this._bookmarkManager = bookmarkManager;
    }

    get bookmarks(): any {

        return this._bookmarkManager.bookmarks;
    }

    public ngOnInit(): void {

        this._bookmarkManager.cacheBookmarks();
    }

    public unfollow(bookmark): void {

        this._bookmarkManager.unfollow(bookmark).catch(error => console.log(error));
    }
}
