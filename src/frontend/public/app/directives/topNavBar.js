'use strict';

angular.module('migration-sample-app')
    .directive('topNavBar', [function () {
        return {
            templateUrl: './app/directives/topNavBar.html'
        };
    }]);
