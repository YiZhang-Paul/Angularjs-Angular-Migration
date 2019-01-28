'use strict';

(() => {

const app = angular.module('migration-sample-app');

app.config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    const index = {

        url: '/',
        redirectTo: 'games'
    };

    const channels = {

        url: '/games/:name',
        templateUrl: './app/views/channels.html',
        params: {
            game: null,
            channels: null
        }
    }

    const featured = {

        url: '/featured',
        templateUrl: './app/views/featured.html'
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
    $stateProvider.state('channels', channels);
    $stateProvider.state('featured', featured);
    $stateProvider.state('histories', histories);
    $stateProvider.state('error', error);
    $urlRouterProvider.otherwise('/error');
});

})();
