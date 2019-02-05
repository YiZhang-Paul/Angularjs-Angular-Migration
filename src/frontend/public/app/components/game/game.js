export class GameController {

    constructor(

        $interval,
        $state,
        channelHttpService,
        gameService,
        genericUtilityService

    ) {
        'ngInject';
        this.$interval = $interval;
        this.$state = $state;
        this.channelService = channelHttpService;
        this.gameService = gameService;
        this.utilities = genericUtilityService;

        this.task = null;
    }

    get games() {

        return this.gameService.games;
    }

    $onInit() {

        this.gameService.cacheGames();

        this.task = this.$interval(() => {

            this.gameService.cacheGames();

        }, 10 * 1000);
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
