'use strict';

(() => {

const app = angular.module('migration-sample-app');

app.config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    const index = {

        url: '/',
        redirectTo: 'games'
    };

    const error = {

        url: '/error',
        templateUrl: './app/error.html'
    };

    $stateProvider.state('index', index);
    $stateProvider.state('error', error);
    $urlRouterProvider.otherwise('/error');
});

})();
