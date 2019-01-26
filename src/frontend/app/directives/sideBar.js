'use strict';

angular.module('migration-sample-app')
    .directive('sideBar', ['sideBarService', function (sideBarService) {

        function link(scope) {

            scope.options = ['Followed Channels', 'Featured Channels', 'View History'];
            scope.badges = new Map();
            scope.badges.set('Followed Channels', []);
            scope.badges.set('Featured Channels', []);
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
                hideHistory: '='
            },
            templateUrl: './directives/sideBar.html',
            link: link
        };
    }]);
