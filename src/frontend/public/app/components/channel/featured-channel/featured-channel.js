export class FeaturedChannelController {

    constructor(

        $interval,
        channelService,
        featuredChannelService,
        viewHistoryService,
        thumbnailPlayerService

    ) {
        'ngInject';
        this.$interval = $interval;
        this.channelService = channelService;
        this.featuredChannelService = featuredChannelService;
        this.historyService = viewHistoryService;
        this.thumbnailPlayer = thumbnailPlayerService;

        this.task = null;
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
