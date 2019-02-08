import "@babel/polyfill";

import ComponentModule from './components/components.module';
import CommonModule from './common/common.module';
import SharedModule from './shared/shared.module';

import { AppComponent } from './app.component';

import AppConfig from './app.config';
import AppRoute from './app.route';

const moduleName = 'migration-sample-app';

export default moduleName;

const app = angular.module(moduleName, [

    'ui.router',
    'ngAnimate',
    'ngMaterial',
    'toastr',
    ComponentModule,
    CommonModule,
    SharedModule
]);

app.config(AppConfig);
app.config(AppRoute);
app.component('app', AppComponent);
