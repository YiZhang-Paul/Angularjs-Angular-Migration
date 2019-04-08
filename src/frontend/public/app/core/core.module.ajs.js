import { BookmarkManagerService } from './services/data-managers/bookmark-manager/bookmark-manager.service';

const moduleName = 'sample-app-core';

export default moduleName;

angular.module(moduleName, [])
    .service('bookmarkManagerService', BookmarkManagerService);
