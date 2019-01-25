angular.module('migration-sample-app')
    .factory('sideBarService', ['$http', '$q', function ($http, $q) {

        var getHistories = function() {
            getHistoriesDeferred = $q.defer();

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

        return {
            getHistories: getHistories
        };
    }]);
