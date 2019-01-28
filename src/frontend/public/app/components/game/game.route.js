'use strict';

(() => {

const app = angular.module('migration-sample-app');

app.config($stateProvider => {
    'ngInject';
    const games = {

        url: '/games',
        templateUrl: './app/views/main.html'
    };

    $stateProvider.state('games', games);
});

})();
