'use strict';

angular.module('migration-sample-app')
    .controller('SideBarController', ['$scope', function ($scope) {
        $scope.options = ['Followed Channels', 'Featured Channels', 'View History'];
    }])
    .directive('sideBar', [function () {
        return {
            templateUrl: './directives/sideBar.html'
        };
    }]);
