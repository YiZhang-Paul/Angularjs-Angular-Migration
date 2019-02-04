export class ChannelController {

    constructor(

        $stateParams,
        $interval,
        gameHttpService,
        channelService,
        viewHistoryService,
        thumbnailPlayerService

    ) {
        'ngInject';
        this.$stateParams = $stateParams;
        this.$interval = $interval;
        this.gameService = gameHttpService;
        this.channelService = channelService;
        this.historyService = viewHistoryService;
        this.thumbnailPlayer = thumbnailPlayerService;

        this.task = null;
        this.game = null;
        this.channels = [];
    }

    $onInit() {

        this._loadComponent();
        this._setupChannelLoading();
    }
    // TODO: move to service
    _loadGame() {

        return this.gameService.getGames().then(games => {

            const name = this.$stateParams.name.replace(/-/g, ' ');
            const game = games.find(_ => _.name === name);

            this.game = game ? game : null;
        })
        .catch(error => console.log(error));
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

    playThumbnail(thumbnail) {

        this.thumbnailPlayer.play(thumbnail);
    }

    stopThumbnail(thumbnail) {

        this.thumbnailPlayer.stop(thumbnail);
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
