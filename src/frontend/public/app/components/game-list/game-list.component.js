import './game-list.css';

export class GameList {

    constructor(

        $interval,
        $state,
        channelHttpService,
        gameListService,
        genericUtilityService

    ) {
        'ngInject';
        this.$interval = $interval;
        this.$state = $state;
        this.channelService = channelHttpService;
        this.gameListService = gameListService;
        this.utilities = genericUtilityService;

        this.task = null;
    }

    get games() {

        return this.gameListService.games;
    }

    $onInit() {

        this.gameListService.cacheGames();

        this.task = this.$interval(() => {

            this.gameListService.cacheGames();

        }, 10 * 1000);
    }

    _changeRoute(game, channels) {

        const name = this.utilities.joinText(game.name);

        this.$state.go('index.channels', { game, name, channels });
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

export const GameListComponent = {

    templateUrl: 'app/components/game-list/game-list.html',
    controller: GameList
};
