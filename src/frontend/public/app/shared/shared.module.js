import { GameHttpService } from './services/game-http.service';
import { ViewHistoryHttpService } from './services/view-history-http.service';

import { capitalizeFilter } from './filters/capitalize.filter';

const moduleName = 'sample-app-shared';

export default moduleName;

angular.module(moduleName, [])
    .service('gameHttpService', GameHttpService)
    .service('viewHistoryHttpService', ViewHistoryHttpService)
    .filter('capitalize', capitalizeFilter);
