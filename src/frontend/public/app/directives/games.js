'use strict';

(() => {

const app = angular.module('migration-sample-app');

app.controller('GameListController', ($scope, $interval, gameService, $http, $state) => {
    'ngInject';
    $scope.games = [];

    const interval = $interval(loadGames(), 10000);

    $scope.toChannelsView = async game => {

        try {

            const url = `http://127.0.0.1:4150/${game.channels}`;
            const response = await $http.get(url);
            const channels = response.data;
            const name = joinWords(game.name);

            $state.go('channels', { name, game, channels });
            $interval.cancel(interval);
        }
        catch (error) {

            console.log(error);
        }
    }

    function loadGames() {

        getGames(gameService).then(_ => syncGames($scope.games, _));

        return loadGames;
    }
});

function joinWords(words) {

    return words.replace(/\s/g, '-');
}

async function getGames(service) {

    try {

        return service.getGameList();
    }
    catch (error) {

        return [];
    }
}

function syncGames(oldGames, newGames) {

    for (let i = 0; i < newGames.length; i++) {

        if (oldGames[i] && oldGames[i].id === newGames[i].id) {

            oldGames[i].view_count = newGames[i].view_count;

            continue;
        }

        oldGames[i] = newGames[i];
    }
}

})();
