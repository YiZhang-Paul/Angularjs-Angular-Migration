import { ViewHistoryCardComponent } from './view-history-card/view-history-card.component';
import { ViewHistoryListComponent } from './view-history-list/view-history-list.component';

import { ViewHistoryListService } from './view-history-list/view-history-list.service';

const moduleName = 'sample-app-view-history';

export default moduleName;

angular.module(moduleName, [])
    .component('viewHistoryCard', ViewHistoryCardComponent)
    .component('viewHistoryList', ViewHistoryListComponent)
    .service('viewHistoryListService', ViewHistoryListService);
