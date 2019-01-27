angular.module('migration-sample-app')
    .factory('gameService', ['$http', '$q', function ($http, $q) {

        var getGameList = function() {
            var getgameListDeferred = $q.defer();

            $http.get('http://127.0.0.1:4150/api/v1/games').then(function(data) {
                    getgameListDeferred.resolve(data.data);
                },
                function(err) {
                    getgameListDeferred.reject(err);
                });
            return getgameListDeferred.promise;
        }

        var getGame = function(id) {
            var getGameDeferred = $q.defer();

            $http.get('http://127.0.0.1:4150/api/v1/games/' + id).then(function(data) {
                    getGameDeferred.resolve(data.data[0]);
                },
                function(err) {
                    getGameDeferred.reject(err);
                });
            return getGameDeferred.promise;
        }

        return {
            getGameList: getGameList,
            getGame: getGame
        };
    }]);
