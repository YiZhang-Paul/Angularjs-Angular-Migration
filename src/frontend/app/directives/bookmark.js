angular.module('migration-sample-app')
    .controller('BookmarkController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.bookmarks = [];

        $http.get('http://127.0.0.1:4150/api/v1/user/bookmarks', {headers: {
                'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            }}).then(function(data) {
                $scope.bookmarks = data.data;
            },
            function(err) {
                console.log(err);
            });
    }]);
