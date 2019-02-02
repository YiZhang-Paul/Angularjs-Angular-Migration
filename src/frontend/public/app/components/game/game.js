import { joinText } from '../../shared/utilities/utilities';

export class GameController {
    // TODO: create service
    constructor($interval, $state, gameHttpService, channelHttpService) {
        'ngInject';
        this.$interval = $interval;
        this.$state = $state;
        this.gameService = gameHttpService;
        this.channelService = channelHttpService;

        this.task = null;
        this.games = [];
    }

    $onInit() {

        this.loadGames();

        const callback = this.loadGames.bind(this);
        const time = 10 * 1000;
        this.task = this.$interval(callback, time);
    }

    loadGames() {

        this.gameService.getGames()
            .then(games => syncGames(this.games, games))
            .catch(() => null);
    }

    toChannelsView(game) {

        this.channelService.getChannelsByGameId(game.id)
            .then(channels => changeRoute(this.$state, game, channels))
            .catch(error => console.log(error));
    }

    $onDestroy() {

        this.$interval.cancel(this.task);
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

function changeRoute($state, game, channels) {

    const name = joinText(game.name);

    $state.go('channels', { game, name, channels });
}
