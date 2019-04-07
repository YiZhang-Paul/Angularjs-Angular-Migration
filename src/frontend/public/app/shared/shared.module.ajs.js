import { LoginPanelComponent } from './components/user-login/login-panel/login-panel.component';

const moduleName = 'sample-app-shared';

export default moduleName;

angular.module(moduleName, ['ngAnimate', 'ngMaterial', 'toastr'])
    .component('loginPanel', LoginPanelComponent);
