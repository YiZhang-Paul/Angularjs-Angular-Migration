'use strict';

(() => {

const app = angular.module('migration-sample-app', [

    'ui.router',
    'ngAnimate',
    'ngMaterial',
    'toastr'
]);

app.config(($transitionsProvider, $windowProvider, $locationProvider, toastrConfig) => {
    'ngInject';
    const $transitions = $transitionsProvider.$get();

    $transitions.onSuccess({}, () => {

        const $window = $windowProvider.$get();
        $window.scrollTo(0, 0);
    });

    $locationProvider.html5Mode(true);
    angular.extend(toastrConfig, { maxOpened: 5, newestOnTop: true });
});

})();
