import { NgModule } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';

import { SharedModule } from '../../shared/shared.module';

import { BookmarkCardComponent } from './bookmark-card/bookmark-card.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import * as BookmarkModuleAjs from './bookmark.module.ajs.js';

@NgModule({
    imports: [SharedModule],
    declarations: [
        BookmarkCardComponent,
        BookmarkListComponent
    ],
    entryComponents: [
        BookmarkCardComponent,
        BookmarkListComponent
    ]
})
export class BookmarkModule { }

angular.module(BookmarkModuleAjs.default)
    .directive('bookmarkCard', downgradeComponent({ component: BookmarkCardComponent }))
    .directive('bookmarkList', downgradeComponent({ component: BookmarkListComponent }));
