export class ChannelController {

    constructor($stateParams, $transitions, $http, $interval, channelService, viewHistoryService, thumbnailPlayerService, gameHttpService) {
        'ngInject';
        this.$stateParams = $stateParams;
        this.$transitions = $transitions;
        this.$http = $http;
        this.$interval = $interval;
        this.channelService = channelService;
        this.historyService = viewHistoryService;
        this.thumbnailPlayer = thumbnailPlayerService;
        this.gameService = gameHttpService;

        this.api = 'http://127.0.0.1:4150/api/v1';

        this.channels = [];
        this.game = null;
    }

    $onInit() {

        this.loadComponent();
        this.setupChannelLoading();
    }

    async loadComponent() {

        if (this.$stateParams.game) {

            this.game = this.$stateParams.game;
            this.channels = this.$stateParams.channels;

            return;
        }

        try {

            const games = await this.gameService.getGames();
            const name = this.$stateParams.name.replace(/-/g, ' ');

            this.game = games.find(_ => _.name === name);
            this.loadChannels();
        }
        catch (error) {

            console.log(error);
        }
    }

    setupChannelLoading() {

        const interval = this.$interval(() => {

            this.loadChannels();

        }, 10 * 1000);

        this.$transitions.onStart({}, transition => {

            if (transition.from().name === 'channels') {

                this.$interval.cancel(interval);
            }
        });
    }

    blinkViewCount(channel) {

        let step = 0;
        channel.updated = true;

        const interval = this.$interval(() => {

            channel.updated = ++step % 2;

            if (step === 6) {

                this.$interval.cancel(interval);
            }

        }, 150);
    }

    isSameChannel(a, b) {

        if (!a || !b || a.provider_id !== b.provider_id) {

            return false;
        }

        return a.provider_channel_id === b.provider_channel_id;
    }

    syncChannel(oldChannel, newChannel) {

        oldChannel.streamer_name = newChannel.streamer_name;
        oldChannel.title = newChannel.title;

        if (oldChannel.view_count !== newChannel.view_count) {

            oldChannel.view_count = newChannel.view_count;
            this.blinkViewCount(oldChannel);
        }
    }

    async loadChannels() {

        try {

            const url = `${this.api}/games/${this.game.id}/channels`;
            const response = await this.$http.get(url);
            const channels = response.data;

            for (let i = 0; i < channels.length; i++) {

                if (!this.isSameChannel(this.channels[i], channels[i])) {

                    this.channels[i] = channels[i];

                    continue;
                }

                this.syncChannel(this.channels[i], channels[i]);
            }
        }
        catch (error) {

            console.log(error);
        }
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
