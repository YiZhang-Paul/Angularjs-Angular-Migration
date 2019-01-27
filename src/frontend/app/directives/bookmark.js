angular.module('migration-sample-app')
    .controller('BookmarkController', ['$scope', '$http', '$q', '$state', 'bookmarkService',
    function ($scope, $http, $q, $state, bookmarkService) {
        $scope.bookmarks = [];

        bookmarkService.getBookmarks().then(function(data) {
            $scope.bookmarks = data;
        },
        function(err) {
            console.log(err);
        });
    }]);
