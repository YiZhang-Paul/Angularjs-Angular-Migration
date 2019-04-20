import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { BookmarkCardComponent } from './bookmark-card/bookmark-card.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        BookmarkCardComponent,
        BookmarkListComponent
    ],
    entryComponents: [
        BookmarkListComponent
    ]
})
export class BookmarkModule { }
