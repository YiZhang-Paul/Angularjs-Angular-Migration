var app = angular.module('migration-sample-app', ['ui.router'])
    .config(['$stateProvider', '$locationProvider',
    function($stateProvider, $locationProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                template: '<h3>Index Page</h3> <a ui-sref="games">Games</a>'
            })
            .state('games', {
                url: '/games',
                template: '<h3>Games Page</h3> <a ui-sref="index">index</a>'
            })

        $locationProvider.html5Mode(true);
    }]);
