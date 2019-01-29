'use strict';

(() => {

const app = angular.module('migration-sample-app');

app.component('channelBadge', {

    bindings: {

        badge: '<'
    },
    templateUrl: './app/components/channel/channel-badge/channel-badge.html'
});

})();
