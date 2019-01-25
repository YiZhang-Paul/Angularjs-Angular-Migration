'use strict';

angular.module('migration-sample-app')
    .controller('SideBarController', ['$scope', function ($scope) {
        $scope.options = ['Followed Channels', 'Featured Channels', 'View History'];
    }])
    .directive('sideBar', ['sideBarService', function (sideBarService) {

        function link(scope) {

            scope.badges = new Map();
            scope.badges.set('Followed Channels', []);
            scope.badges.set('Featured Channels', []);

            sideBarService.getHistories().then(function(data) {
                scope.badges.set('View History', data);
            },
            function(err) {
                console.log(err);
            });
        }

        return {
            templateUrl: './directives/sideBar.html',
            link: link
        };
    }]);
