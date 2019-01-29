'use strict';

(() => {

const app = angular.module('migration-sample-app');

app.config($stateProvider => {
    'ngInject';
    const histories = {

        url: '/histories',
        templateUrl: './app/components/view-history/view-history.html'
    };

    $stateProvider.state('histories', histories);
});

})();
