export class FeaturedChannelController {

    constructor(

        $transitions,
        $interval,
        channelService,
        featuredChannelService,
        viewHistoryService,
        thumbnailPlayerService

    ) {
        'ngInject';
        this.$transitions = $transitions;
        this.$interval = $interval;
        this.channelService = channelService;
        this.featuredChannelService = featuredChannelService;
        this.historyService = viewHistoryService;
        this.thumbnailPlayer = thumbnailPlayerService;

        this.channels = [];
    }

    $onInit() {

        this._loadChannels();
        this._setupChannelLoading();
    }

    _loadChannels() {

        this.featuredChannelService.getFeaturedChannels().then(channels => {

            this.channelService.refreshChannels(this.channels, channels);
        })
        .catch(error => console.log(error));
    }

    _setupChannelLoading() {

        const interval = this.$interval(() => {

            this._loadChannels();

        }, 10 * 1000);

        this.$transitions.onStart({}, transition => {

            if (transition.from().name === 'featured') {

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
