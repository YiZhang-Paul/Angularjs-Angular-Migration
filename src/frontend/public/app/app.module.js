import "@babel/polyfill";

import ComponentModule from './components/components.module';
import CommonModule from './common/common.module';
import SharedModule from './shared/shared.module';

import AppConfig from './app.config';
import AppRoute from './app.route';

const app = angular.module('migration-sample-app', [

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
