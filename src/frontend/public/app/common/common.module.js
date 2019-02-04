import { TopNavigationBarComponent } from './top-navigation-bar/top-navigation-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { SidebarService } from './sidebar/sidebar.service';

const moduleName = 'sample-app-common';

export default moduleName;

angular.module(moduleName, ['toastr'])
    .component('topNavbar', TopNavigationBarComponent)
    .component('sidebar', SidebarComponent)
    .service('sidebarService', SidebarService);
