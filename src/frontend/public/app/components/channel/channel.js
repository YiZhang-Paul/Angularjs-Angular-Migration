export class ChannelController {

    constructor($rootScope, $stateParams, $transitions, $http, $interval, channelService, gameHttpService) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.$stateParams = $stateParams;
        this.$transitions = $transitions;
        this.$http = $http;
        this.$interval = $interval;
        this.channelService = channelService;
        this.gameService = gameHttpService;

        this.api = 'http://127.0.0.1:4150/api/v1';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        this.defaultHeaders = { 'Authorization': `bearer ${this.token}` };
        this.defaultOptions = Object.freeze({ headers: this.defaultHeaders });

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

    playThumbnail(video) {

        this.channelService.playThumbnail(video);
    }

    stopThumbnail(video) {

        this.channelService.stopThumbnail(video);
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

    async addHistory(channel) {

        try {

            const url = `${this.api}/user/histories`;
            const gameName = channel.provider_game_name;
            const data = Object.assign({ game_name: gameName }, channel);

            await this.$http.post(url, data, this.defaultOptions);
            this.$rootScope.$broadcast('historyUpdated');
        }
        catch (error) {

            console.log(error);
        }
    }
}
