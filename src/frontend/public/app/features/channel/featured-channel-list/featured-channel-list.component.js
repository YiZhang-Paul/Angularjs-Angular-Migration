import './featured-channel-list.scss';

export class FeaturedChannelListController {

    constructor(

        $interval,
        channelService,
        bookmarkManagerService,
        viewHistoryManagerService

    ) {
        'ngInject';
        this.$interval = $interval;
        this.channelService = channelService;
        this.bookmarkManager = bookmarkManagerService;
        this.viewHistoryManager = viewHistoryManagerService;

        this.task = null;
        this.channels = [];
    }

    $onInit() {

        this.channelService.loadFeaturedChannels(this.channels);
        this._setupChannelLoading();
    }

    _setupChannelLoading() {

        this.task = this.$interval(() => {

            this.channelService.loadFeaturedChannels(this.channels);

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
