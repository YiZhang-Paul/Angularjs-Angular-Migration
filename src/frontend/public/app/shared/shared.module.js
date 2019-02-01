import { ViewHistoryHttpService } from './services/view-history-http.service';

import { capitalizeFilter } from './filters/capitalize.filter';

const moduleName = 'sample-app-shared';

export default moduleName;

angular.module(moduleName, [])
    .service('viewHistoryHttpService', ViewHistoryHttpService)
    .filter('capitalize', capitalizeFilter);
