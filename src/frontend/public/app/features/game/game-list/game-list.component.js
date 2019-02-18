import './game-list.scss';

export class GameListController {

    constructor(

        $interval,
        gameManagerService,
        customRoutingService

    ) {
        'ngInject';
        this.$interval = $interval;
        this.gameManager = gameManagerService;
        this.customRouting = customRoutingService;

        this.task = null;
    }

    get games() {

        return this.gameManager.games;
    }

    $onInit() {

        this.gameManager.cacheGames();

        this.task = this.$interval(() => {

            this.gameManager.cacheGames();

        }, 10 * 1000);
    }

    toChannelsView(game) {

        this.customRouting.toChannelsView(game.id);
    }

    $onDestroy() {

        this.$interval.cancel(this.task);
    }
}

export const GameListComponent = {

    templateUrl: 'app/features/game/game-list/game-list.html',
    controller: GameListController
};
