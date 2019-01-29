'use strict';

(() => {

const app = angular.module('migration-sample-app');

app.config($stateProvider => {
    'ngInject';
    const bookmarks = {

        url: '/bookmarks',
        templateUrl: './app/components/bookmark/bookmark.html'
    };

    $stateProvider.state('bookmarks', bookmarks);
});

})();
