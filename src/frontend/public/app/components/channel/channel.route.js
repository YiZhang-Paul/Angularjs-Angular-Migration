'use strict';

(() => {

const app = angular.module('migration-sample-app');

app.config($stateProvider => {
    'ngInject';
    const channels = {

        url: '/games/:name',
        templateUrl: './app/components/channel/channel.html',
        params: {
            game: null,
            channels: null
        }
    }

    const featured = {

        url: '/featured',
        templateUrl: './app/views/featured.html'
    };

    $stateProvider.state('channels', channels);
    $stateProvider.state('featured', featured);
});

})();
