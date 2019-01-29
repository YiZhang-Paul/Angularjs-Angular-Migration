'use strict';

(() => {

const app = angular.module('migration-sample-app');

class ChannelBadgeComponent { }

app.component('channelBadge', {

    bindings: {

        badge: '<'
    },
    templateUrl: './app/components/channel/channel-badge/channel-badge.html',
    controller: ChannelBadgeComponent
});

})();
