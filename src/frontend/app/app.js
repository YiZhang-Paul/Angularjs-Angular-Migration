var app = angular.module('migration-sample-app', ['ui.router', 'ngAnimate', 'ngMaterial', 'toastr'])
    .config(['$windowProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$transitionsProvider', 'toastrConfig',
    function($windowProvider, $stateProvider, $urlRouterProvider, $locationProvider, $transitionsProvider, toastrConfig) {
        $stateProvider
            .state('index', {
                url: '/',
                redirectTo: 'games'
            })
            .state('games', {
                url: '/games',
                templateUrl: './views/main.html'
            })
            .state('channels', {
                url: '/games/:name/channels',
                templateUrl: './views/channels.html',
                params: {
                    game: null,
                    channels: null
                }
            })
            .state('featured', {
                url: '/featured',
                templateUrl: './views/featured.html'
            })
            .state('bookmarks', {
                url: '/bookmarks',
                templateUrl: './views/bookmarks.html'
            })
            .state('histories', {
                url: '/histories',
                templateUrl: './views/histories.html'
            })
            .state('error', {
                url: '/error',
                templateUrl: './views/error.html'
            })

        var $transitions = $transitionsProvider.$get();
        $transitions.onSuccess({}, function() {
            var $window = $windowProvider.$get();
            $window.scrollTo(0, 0);
        });

        $urlRouterProvider.otherwise('/error');
        $locationProvider.html5Mode(true);

        angular.extend(toastrConfig, {
            maxOpened: 5,
            newestOnTop: true
          });
    }]);

app.controller('GameListController', ['$scope', 'gameService', '$http', '$state',
    function ($scope, gameService, $http, $state) {

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

        var joinWords = function (words) {
            return words.replace(/\s/g, '-');
        }

        $scope.getChannels = function(game) {
            $http.get('http://127.0.0.1:4150/' + game.channels).then(function(data) {
                var channels = data.data;
                $state.go('channels', { game, name: joinWords(game.name), channels });
            });
            clearInterval(interval);
        }
    }]);
