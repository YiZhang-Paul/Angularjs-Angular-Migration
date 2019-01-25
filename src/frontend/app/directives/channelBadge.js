'use strict';

angular.module('migration-sample-app')
    .controller('ChannelBadgeController', ['$scope', function ($scope) {
    }])
    .directive('channelBadge', [function () {
        return {
            scope: {
                badge: '='
            },
            templateUrl: './directives/channelBadge.html'
        };
    }]);
