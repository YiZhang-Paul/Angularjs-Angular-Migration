export class GameController {

    constructor(

        $interval,
        $state,
        gameHttpService,
        channelHttpService,
        genericUtilityService

    ) {
        'ngInject';
        this.$interval = $interval;
        this.$state = $state;
        this.gameService = gameHttpService;
        this.channelService = channelHttpService;
        this.utilities = genericUtilityService;

        this.task = null;
        this.games = [];
    }

    $onInit() {

        this._loadGames();

        const callback = this._loadGames.bind(this);
        const time = 10 * 1000;
        this.task = this.$interval(callback, time);
    }

    _syncGames(games) {

        for (let i = 0; i < games.length; i++) {

            if (this.games[i] && this.games[i].id === games[i].id) {

                this.games[i].view_count = games[i].view_count;

                continue;
            }

            this.games[i] = games[i];
        }
    }

    _loadGames() {

        this.gameService.getGames().then(games => {

            this._syncGames(games);
        })
        .catch(() => null);
    }

    _changeRoute(game, channels) {

        const name = this.utilities.joinText(game.name);

        this.$state.go('channels', { game, name, channels });
    }

    toChannelsView(game) {

        this.channelService.getChannelsByGameId(game.id).then(channels => {

            this._changeRoute(game, channels);
        })
        .catch(error => console.log(error));
    }

    $onDestroy() {

        this.$interval.cancel(this.task);
    }
}
