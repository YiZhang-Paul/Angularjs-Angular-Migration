import { ChannelBadgeComponent } from './components/badges/channel-badge/channel-badge.component';
import { LoginPanelComponent } from './components/user-login/login-panel/login-panel.component';
import { SidebarBadgeComponent } from './components/badges/sidebar-badge/sidebar-badge.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopNavigationBarComponent } from './components/top-navigation-bar/top-navigation-bar.component';

import { capitalizeFilter } from './filters/capitalize/capitalize.filter';
import { shortViewCountFilter } from './filters/short-view-count/short-view-count.filter';
import { uppercaseRomanNumeralsFilter } from './filters/uppercase-roman-numerals/uppercase-roman-numerals.filter';

const moduleName = 'sample-app-shared';

export default moduleName;

angular.module(moduleName, [])
    .component('channelBadge', ChannelBadgeComponent)
    .component('loginPanel', LoginPanelComponent)
    .component('sidebarBadge', SidebarBadgeComponent)
    .component('sidebar', SidebarComponent)
    .component('topNavbar', TopNavigationBarComponent)
    .filter('capitalize', capitalizeFilter)
    .filter('shortViewCount', shortViewCountFilter)
    .filter('uppercaseRomanNumerals', uppercaseRomanNumeralsFilter);
