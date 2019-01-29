import { capitalizeFilter } from './filters/capitalize.filter';

const moduleName = 'sample-app-shared';

export default moduleName;

angular.module(moduleName, [])
    .filter('capitalize', capitalizeFilter);
