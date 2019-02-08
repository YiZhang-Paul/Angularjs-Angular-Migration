import './channel.css';

export class Channel {

    constructor(

        $stateParams,
        $interval,
        gameHttpService,
        channelService,
        viewHistoryService

    ) {
        'ngInject';
        this.$stateParams = $stateParams;
        this.$interval = $interval;
        this.gameHttpService = gameHttpService;
        this.channelService = channelService;
        this.historyService = viewHistoryService;

        this.task = null;
        this.game = null;
        this.channels = [];
    }

    $onInit() {

        this._loadComponent();
        this._setupChannelLoading();
    }

    _loadGame() {

        const name = this.$stateParams.name.replace(/-/g, ' ');

        return this.gameHttpService.getGameByName(name).then(game => {

            this.game = game;
        })
        .catch(() => null);
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

export const ChannelComponent = {

    templateUrl: 'app/components/channel/channel.html',
    controller: Channel
};
