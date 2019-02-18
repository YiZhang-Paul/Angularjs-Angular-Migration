import './game-channel-list.scss';

export class GameChannelListController {

    constructor(

        $interval,
        $stateParams,
        channelService,
        gameHttpService,
        bookmarkManagerService,
        viewHistoryManagerService

    ) {
        'ngInject';
        this.$interval = $interval;
        this.$stateParams = $stateParams;
        this.channelService = channelService;
        this.gameHttp = gameHttpService;
        this.bookmarkManager = bookmarkManagerService;
        this.viewHistoryManager = viewHistoryManagerService;

        this.task = null;
        this.game = null;
        this.name = null;
        this.channels = [];
    }

    $onInit() {

        this.name = this.$stateParams.name.replace(/-/g, ' ');
        this._loadComponent();
        this._setupChannelLoading();
    }

    _loadGame() {

        return this.gameHttp.getGameByName(this.name).then(game => {

            this.game = game;
        });
    }

    _loadChannels() {

        if (this.game) {

            this.channelService.loadGameChannels(this.channels, this.game.id);
        }
    }

    _loadComponent() {

        this._loadGame().then(() => {

            if (!this.$stateParams.channels) {

                return this._loadChannels();
            }

            this.channels = this.$stateParams.channels;
        })
        .catch(error => console.log(error));
    }

    _setupChannelLoading() {

        this.task = this.$interval(() => this._loadChannels(), 10 * 1000);
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
