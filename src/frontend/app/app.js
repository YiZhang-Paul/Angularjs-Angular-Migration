var app = angular.module('migration-sample-app', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                redirectTo: 'games'
            })
            .state('games', {
                url: '/games',
                templateUrl: './views/main.html'
            })
            .state('error', {
                url: '/error',
                templateUrl: './views/error.html'
            })

        $urlRouterProvider.otherwise('/error');
        $locationProvider.html5Mode(true);
    }]);

app.controller('GameListController', ['$scope', 'gameService',
    function ($scope, gameService) {

        $scope.games = [];

        var interval = setInterval(function loadGames() {
            gameService.getGameList().then(function(data) {
                $scope.games = data;
                },
                function(err) {
                    console.log(err);
                });
                return loadGames;
        }(), 10000);
    }]);
