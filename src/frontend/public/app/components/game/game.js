export class GameController {
    // TODO: create service
    constructor($interval, $http, $state, gameHttpService) {
        'ngInject';
        this.$interval = $interval;
        this.$http = $http;
        this.$state = $state;
        this.service = gameHttpService;

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

        this.service.getGames()
            .then(games => syncGames(this.games, games))
            .catch(() => null);
    }

    joinWords(words) {

        return words.replace(/\s/g, '-');
    }

    async toChannelsView(game) {

        try {

            const url = `http://127.0.0.1:4150/${game.channels}`;
            const response = await this.$http.get(url);
            const channels = response.data;
            const name = this.joinWords(game.name);

            this.$state.go('channels', { name, game, channels });
            this.$interval.cancel(this.task);
        }
        catch (error) {

            console.log(error);
        }
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
