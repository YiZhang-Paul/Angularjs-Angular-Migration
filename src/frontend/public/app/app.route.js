'use strict';

(() => {

const app = angular.module('migration-sample-app');

app.config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    const index = {

        url: '/',
        redirectTo: 'games'
    };

    const histories = {

        url: '/histories',
        templateUrl: './app/views/histories.html'
    };

    const error = {

        url: '/error',
        templateUrl: './app/views/error.html'
    };

    $stateProvider.state('index', index);
    $stateProvider.state('histories', histories);
    $stateProvider.state('error', error);
    $urlRouterProvider.otherwise('/error');
});

})();
