import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';

const moduleName = 'sample-app-bookmark';

export default moduleName;

angular.module(moduleName, [])
    .component('bookmarkList', BookmarkListComponent);
