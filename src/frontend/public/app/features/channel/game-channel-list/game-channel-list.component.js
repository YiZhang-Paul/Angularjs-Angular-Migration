import './game-channel-list.scss';

export class GameChannelListController {

    constructor(

        $stateParams,
        $interval,
        gameHttpService,
        bookmarkManagerService,
        channelManagerService,
        viewHistoryManagerService

    ) {
        'ngInject';
        this.$stateParams = $stateParams;
        this.$interval = $interval;
        this.gameHttp = gameHttpService;
        this.bookmarkManager = bookmarkManagerService;
        this.channelManager = channelManagerService;
        this.viewHistoryManager = viewHistoryManagerService;

        this.task = null;
        this.game = null;
        this.channels = [];
    }

    $onInit() {

        this._loadComponent();
        this._setupChannelLoading();
    }
    // TODO: move to shared channel service (in channel module)
    _loadGame() {

        const name = this.$stateParams.name.replace(/-/g, ' ');

        return this.gameHttp.getGameByName(name).then(game => {

            this.game = game;
        })
        .catch(() => null);
    }
    // TODO: move to shared channel service (in channel module)
    _loadChannels() {

        if (!this.game) {

            return;
        }

        this.channelManager.getChannelsByGameId(this.game.id).then(channels => {

            this.channelManager.refreshChannels(this.channels, channels);
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

        return this.bookmarkManager.isFollowed(channel);
    }

    follow(channel) {

        this.bookmarkManager.follow(channel);
    }

    unfollow(channel) {

        this.bookmarkManager.unfollow(channel);
    }

    addHistory(channel) {

        this.viewHistoryManager.addHistory(channel);
    }

    $onDestroy() {

        this.$interval.cancel(this.task);
    }
}

export const GameChannelListComponent = {

    templateUrl: 'app/features/channel/game-channel-list/game-channel-list.html',
    controller: GameChannelListController
};
