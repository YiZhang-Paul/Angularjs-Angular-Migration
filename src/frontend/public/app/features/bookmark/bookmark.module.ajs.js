import { BookmarkCardComponent } from './bookmark-card/bookmark-card.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';

const moduleName = 'sample-app-bookmark';

export default moduleName;

angular.module(moduleName, [])
    .component('bookmarkCard', BookmarkCardComponent)
    .component('bookmarkList', BookmarkListComponent);
