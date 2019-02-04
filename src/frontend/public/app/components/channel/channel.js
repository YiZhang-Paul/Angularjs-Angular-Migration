export class ChannelController {

    constructor($stateParams, $transitions, $interval, channelService, viewHistoryService, thumbnailPlayerService, gameHttpService) {
        'ngInject';
        this.$stateParams = $stateParams;
        this.$transitions = $transitions;
        this.$interval = $interval;
        this.channelService = channelService;
        this.historyService = viewHistoryService;
        this.thumbnailPlayer = thumbnailPlayerService;
        this.gameService = gameHttpService;

        this.channels = [];
        this.game = null;
    }

    $onInit() {

        this._loadComponent();
        this._setupChannelLoading();
    }

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

        const interval = this.$interval(() => {

            this._loadChannels();

        }, 10 * 1000);

        this.$transitions.onStart({}, transition => {

            if (transition.from().name === 'channels') {

                this.$interval.cancel(interval);
            }
        });
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
}
