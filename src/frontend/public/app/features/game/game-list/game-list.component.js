import './game-list.scss';

export class GameListController {

    constructor(

        $interval,
        $state,
        channelHttpService,
        gameManagerService,
        genericUtilitiesService

    ) {
        'ngInject';
        this.$interval = $interval;
        this.$state = $state;
        this.channelService = channelHttpService;
        this.gameListService = gameManagerService;
        this.utilities = genericUtilitiesService;

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

    templateUrl: 'app/features/game/game-list/game-list.html',
    controller: GameListController
};
