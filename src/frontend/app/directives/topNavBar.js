'use strict';

angular.module('migration-sample-app')
    .directive('topNavBar', [function () {
        return {
            templateUrl: './directives/topNavBar.html'
        };
    }]);
