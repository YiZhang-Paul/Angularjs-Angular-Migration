import CoreModule from './core/core.module.ajs';
import FeaturesModule from './features/features.module.ajs';
import SharedModule from './shared/shared.module.ajs';

import { AppComponent } from './app.component';

import AppConfig from './core/configurations/global.config';
import AppRoute from './app.route';

const moduleName = 'migration-sample-app';

export default moduleName;

export const app = angular.module(moduleName, [

    'ui.router',
    'ui.router.upgrade',
    'ngAnimate',
    'ngMaterial',
    'toastr',
    CoreModule,
    FeaturesModule,
    SharedModule
]);

app.config(AppConfig);
app.config(AppRoute);
app.component('app', AppComponent);
