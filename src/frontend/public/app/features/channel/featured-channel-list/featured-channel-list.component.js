import './featured-channel-list.scss';

export class FeaturedChannelListController {

    constructor(

        $interval,
        channelManagerService,
        featuredChannelManagerService,
        viewHistoryManagerService

    ) {
        'ngInject';
        this.$interval = $interval;
        this.channelService = channelManagerService;
        this.featuredChannelService = featuredChannelManagerService;
        this.historyService = viewHistoryManagerService;

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

export const FeaturedChannelListComponent = {

    templateUrl: 'app/features/channel/featured-channel-list/featured-channel-list.html',
    controller: FeaturedChannelListController
};