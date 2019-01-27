angular.module('migration-sample-app')
    .controller('BookmarkController', ['$rootScope', '$scope', '$http', '$q', '$state', 'bookmarkService',
    function ($rootScope, $scope, $http, $q, $state, bookmarkService) {
        $scope.bookmarks = [];

        bookmarkService.getBookmarks().then(function(data) {
            $scope.bookmarks = data;
        },
        function(err) {
            console.log(err);
        });

        $scope.unfollow = function(bookmark) {
            bookmarkService.unfollow(bookmark).then(function() {
                for(var i = 0; i < $scope.bookmarks.length; i++) {
                    if(bookmark.id == $scope.bookmarks[i].id) {
                        $scope.bookmarks.splice(i, 1);
                        $rootScope.$broadcast('bookmarkUpdated');
                        break;
                    }
                }
            },
            function(err) {
                console.log(err);
            });
        }
    }]);
