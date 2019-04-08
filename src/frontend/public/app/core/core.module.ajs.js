import { BookmarkManagerService } from './services/data-managers/bookmark-manager/bookmark-manager.service';
import { ViewHistoryHttpService } from './services/http/view-history-http/view-history-http.service';
import { ViewHistoryManagerService } from './services/data-managers/view-history-manager/view-history-manager.service';

const moduleName = 'sample-app-core';

export default moduleName;

angular.module(moduleName, [])
    .service('bookmarkManagerService', BookmarkManagerService)
    .service('viewHistoryHttpService', ViewHistoryHttpService)
    .service('viewHistoryManagerService', ViewHistoryManagerService);
