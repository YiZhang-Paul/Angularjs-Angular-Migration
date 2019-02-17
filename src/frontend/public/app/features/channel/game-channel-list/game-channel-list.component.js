import './game-channel-list.scss';

export class GameChannelListController {

    constructor(

        $interval,
        $stateParams,
        channelService,
        bookmarkManagerService,
        viewHistoryManagerService

    ) {
        'ngInject';
        this.$interval = $interval;
        this.$stateParams = $stateParams;
        this.channelService = channelService;
        this.bookmarkManager = bookmarkManagerService;
        this.viewHistoryManager = viewHistoryManagerService;

        this.task = null;
        this.name = null;
        this.channels = [];
    }

    $onInit() {

        this.name = this.$stateParams.name.replace(/-/g, ' ');
        this._loadComponent();
        this._setupChannelLoading();
    }

    _loadComponent() {

        if (this.$stateParams.channels) {

            this.channels = this.$stateParams.channels;

            return;
        }

        this.channelService.loadGameChannels(this.channels, this.name);
    }

    _setupChannelLoading() {

        this.task = this.$interval(() => {

            this.channelService.loadGameChannels(this.channels, this.name);

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

export const GameChannelListComponent = {

    templateUrl: 'app/features/channel/game-channel-list/game-channel-list.html',
    controller: GameChannelListController
};
