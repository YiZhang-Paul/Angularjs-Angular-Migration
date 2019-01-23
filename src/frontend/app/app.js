var app = angular.module('migration-sample-app', ['ui.router', 'ngAnimate'])
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
                    updateGameList(data);
                },
                function(err) {
                    console.log(err);
                });
                return loadGames;
        }(), 10000);

        var updateGameList = function(list) {
            if (!$scope.games.length) {
                $scope.games = list;
            }
            else {
                var length = Math.min($scope.games.length, list.length);
                for (var i = 0; i < length; i++) {
                    if ($scope.games[i]['id'] == list[i]['id']) {
                        $scope.games[i]['view_count'] = list[i]['view_count'];
                    }
                    else {
                        $scope.games[i] = list[i];
                    }
                }
            }
        }
    }]);
