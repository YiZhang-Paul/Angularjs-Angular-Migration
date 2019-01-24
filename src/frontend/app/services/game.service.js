angular.module('migration-sample-app')
    .factory('gameService', ['$http', '$q', function ($http, $q) {

        var getGameList = function() {
            getgameListDeferred = $q.defer();

            $http.get('http://127.0.0.1:4150/api/v1/games').then(function(data) {
                    getgameListDeferred.resolve(data.data);
                },
                function(err) {
                    getgameListDeferred.reject(err);
                });
            return getgameListDeferred.promise;
        }

        return {
            getGameList: getGameList
        };
    }]);
