import './game-channel-list.scss';

export class GameChannelListController {

    constructor(

        $stateParams,
        $interval,
        gameHttpService,
        channelManagerService,
        viewHistoryManagerService

    ) {
        'ngInject';
        this.$stateParams = $stateParams;
        this.$interval = $interval;
        this.gameHttpService = gameHttpService;
        this.channelService = channelManagerService;
        this.historyService = viewHistoryManagerService;

        this.task = null;
        this.game = null;
        this.channels = [];
    }

    $onInit() {

        this._loadComponent();
        this._setupChannelLoading();
    }

    _loadGame() {

        const name = this.$stateParams.name.replace(/-/g, ' ');

        return this.gameHttpService.getGameByName(name).then(game => {

            this.game = game;
        })
        .catch(() => null);
    }

    _loadChannels() {

        if (!this.game) {

            return;
        }

        this.channelService.getChannelsByGameId(this.game.id).then(channels => {

            this.channelService.refreshChannels(this.channels, channels);
        })
        .catch(error => console.log(error));
    }

    _loadComponent() {

        if (this.$stateParams.game && this.$stateParams.channels) {

            this.game = this.$stateParams.game;
            this.channels = this.$stateParams.channels;

            return;
        }

        this._loadGame().then(() => this._loadChannels());
    }

    _setupChannelLoading() {

        this.task = this.$interval(() => {

            this._loadChannels();

        }, 10 * 1000);
    }

    isFollowed(channel) {

        return this.channelService.isFollowed(channel);
    }

    follow(channel) {

        this.channelService.follow(channel);
    }

    unfollow(channel) {

        this.channelService.unfollow(channel);
    }

    addHistory(channel) {

        this.historyService.addHistory(channel);
    }

    $onDestroy() {

        this.$interval.cancel(this.task);
    }
}

export const GameChannelListComponent = {

    templateUrl: 'app/features/channel/game-channel-list/game-channel-list.html',
    controller: GameChannelListController
};
