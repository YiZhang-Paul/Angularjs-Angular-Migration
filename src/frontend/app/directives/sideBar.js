'use strict';

angular.module('migration-sample-app')
    .directive('sideBar', ['sideBarService', '$http', function (sideBarService, $http) {

        function link(scope) {

            scope.options = ['Followed Channels', 'Featured Channels', 'View History'];
            scope.targetRoutes = ['followed', 'featured', 'histories'];
            scope.badges = new Map();
            $http.get('http://127.0.0.1:4150/api/v1/channels').then(function(data) {
                scope.badges.set('Featured Channels', data.data.slice(0, 3));
            },
            function(err) {
                console.log(err);
            });
            scope.badges.set('Followed Channels', []);
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
        }

        return {
            scope: {
                hide: '='
            },
            templateUrl: './directives/sideBar.html',
            link: link
        };
    }]);
