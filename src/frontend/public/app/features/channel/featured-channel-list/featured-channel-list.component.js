import './featured-channel-list.scss';

export class FeaturedChannelListController {

    constructor(

        $interval,
        bookmarkManagerService,
        channelManagerService,
        featuredChannelManagerService,
        viewHistoryManagerService

    ) {
        'ngInject';
        this.$interval = $interval;
        this.bookmarkManager = bookmarkManagerService;
        this.channelManager = channelManagerService;
        this.featuredChannelManager = featuredChannelManagerService;
        this.viewHistoryManager = viewHistoryManagerService;

        this.task = null;
        this.channels = [];
    }

    $onInit() {

        this._loadChannels();
        this._setupChannelLoading();
    }
    // TODO: move to shared channel service (in channel module)
    _loadChannels() {

        this.featuredChannelManager.getFeaturedChannels().then(channels => {

            this.channelManager.refreshChannels(this.channels, channels);
        })
        .catch(error => console.log(error));
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

export const FeaturedChannelListComponent = {

    templateUrl: 'app/features/channel/featured-channel-list/featured-channel-list.html',
    controller: FeaturedChannelListController
};
