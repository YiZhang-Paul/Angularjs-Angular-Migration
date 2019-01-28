'use strict';

angular.module('migration-sample-app')
    .directive('channelBadge', [function () {
        return {
            scope: {
                badge: '='
            },
            templateUrl: './app/directives/channelBadge.html'
        };
    }]);
