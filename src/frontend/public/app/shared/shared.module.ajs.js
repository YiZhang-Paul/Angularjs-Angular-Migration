import { LoginPanelComponent } from './components/user-login/login-panel/login-panel.component';

import { capitalizeFilter } from './filters/capitalize/capitalize.filter';
import { shortViewCountFilter } from './filters/short-view-count/short-view-count.filter';
import { uppercaseRomanNumeralsFilter } from './filters/uppercase-roman-numerals/uppercase-roman-numerals.filter';

const moduleName = 'sample-app-shared';

export default moduleName;

angular.module(moduleName, ['ngAnimate', 'ngMaterial', 'toastr'])
    .component('loginPanel', LoginPanelComponent)
    .filter('capitalize', capitalizeFilter)
    .filter('shortViewCount', shortViewCountFilter)
    .filter('uppercaseRomanNumerals', uppercaseRomanNumeralsFilter);
