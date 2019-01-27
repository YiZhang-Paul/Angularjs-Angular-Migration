'use strict';

angular.module('migration-sample-app')
    .directive('sideBar', ['sideBarService', '$http', '$q', 'toastr', function (sideBarService, $http, $q, toastr) {

        function link(scope) {
            scope.bookmarks = [];
            scope.options = ['Followed Channels', 'Featured Channels', 'View History'];
            scope.targetRoutes = ['bookmarks', 'featured', 'histories'];
            scope.badges = new Map();
            sideBarService.getBookmarks().then(function(data) {
                scope.bookmarks = data;
                scope.badges.set('Followed Channels', data.slice(0, 3));
            },
            function(err) {
                console.log(err);
            });

            $http.get('http://127.0.0.1:4150/api/v1/channels').then(function(data) {
                data = data.data.slice(0, 3);
                for (var i = 0; i < data.length; i++) {
                    data[i].game_name = data[i].provider_game_name;
                }
                scope.badges.set('Featured Channels', data);
            },
            function(err) {
                console.log(err);
            });

            sideBarService.getHistories().then(function(data) {
                scope.badges.set('View History', data.slice(0, 3));
            },
            function(err) {
                console.log(err);
            });

            scope.$on('historyUpdated', function() {
                sideBarService.getHistories().then(function(data) {
                    scope.badges.set('View History', data.slice(0, 3));
                },
                function(err) {
                    console.log(err);
                });
            });

            scope.$on('bookmarkUpdated', function() {
                var length = scope.bookmarks.length;
                sideBarService.getBookmarks().then(function(data) {
                    scope.bookmarks = data;
                    scope.badges.set('Followed Channels', data.slice(0, 3));
                    if(scope.bookmarks.length > length) {
                        toastr.success('Successfully followed the channel.', { timeOut: 2500 });
                    }
                    else {
                        toastr.error('You just unfollowed a channel.', { timeOut: 2500 });
                    }
                },
                function(err) {
                    console.log(err);
                });
            });
        }

        return {
            scope: {
                hideOptions: '='
            },
            templateUrl: './directives/sideBar.html',
            link: link
        };
    }]);
