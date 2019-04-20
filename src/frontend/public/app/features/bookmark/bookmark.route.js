import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';

export const BookmarksState = {

    name: 'bookmarks',

    state: {

        url: '^/bookmarks',
        component: BookmarkListComponent
    }
};
