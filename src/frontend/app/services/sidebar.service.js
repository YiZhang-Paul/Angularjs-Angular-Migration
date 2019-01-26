angular.module('migration-sample-app')
    .factory('sideBarService', ['$http', '$q', function ($http, $q) {

        var getHistories = function() {
            var getHistoriesDeferred = $q.defer();

            $http.get('http://127.0.0.1:4150/api/v1/user/histories', {headers: {
                'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            }}).then(function(data) {
                    getHistoriesDeferred.resolve(data.data.sort(function(a, b) {
                        return new Date(b.timestamp) - new Date(a.timestamp);
                    }));
                },
                function(err) {
                    getHistoriesDeferred.reject(err);
                });
            return getHistoriesDeferred.promise;
        }

        var deleteHistory = function (history) {
            var deleteHistoryDeferred = $q.defer();

            $http.delete('http://127.0.0.1:4150/api/v1/user/histories/' + history.id, {headers: {
                'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            }}).then(function(data) {
                    deleteHistoryDeferred.resolve(data);
                },
                function(err) {
                    deleteHistoryDeferred.reject(err);
                });
            return deleteHistoryDeferred.promise;
        }

        return {
            getHistories: getHistories,
            deleteHistory: deleteHistory
        };
    }])
angular.module('migration-sample-app')
    .controller('ViewHistoryController', ['$scope', '$http', '$state', 'sideBarService', 'gameService',
    function($scope, $http, $state, sideBarService, gameService) {

        $scope.histories = [];

        sideBarService.getHistories().then(function(data) {
            $scope.histories = data;
        },function(err) { console.log(err); });

        $scope.isStaticImage = function (url) {

            return !/(mp4|m4v)$/i.test(url);
        }

        $scope.deleteHistory =function(history) {

            sideBarService.deleteHistory(history).then(function(data) {

                var index = -1;
                for (var i = 0; i < $scope.histories.length; i++) {
                    if ($scope.histories[i].id == history.id) {
                        index = i;
                    }
                }

                if (index != -1) {
                    $scope.histories.splice(index, 1);
                }
            },
            function(err) {
                console.log(err);
            });
        }

        var joinWords = function (words) {
            return words.replace(/\s/g, '-');
        }

        $scope.getChannels = function(id) {

            gameService.getGame(id).then(function(game) {
                $http.get('http://127.0.0.1:4150/' + game.channels).then(function(data) {
                    var channels = data.data;
                    $state.go('channels', { game, name: joinWords(game.name), channels });
                });
            },
            function(err) {
                console.log(err);
            });

        }

        $scope.clearHistories = function () {
            $http.delete('http://127.0.0.1:4150/api/v1/user/histories/', {headers: {
                'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            }}).then(function() {
                $scope.histories = [];
            },
            function(err) {
                console.log(err);
            });
        }
    }]);
