export class Sidebar {

    constructor($scope, $http, toastr, sidebarService) {
        'ngInject';
        this.$scope = $scope;
        this.$http = $http;
        this.toastr = toastr;
        this.service = sidebarService;

        this.options = ['Followed Channels', 'Featured Channels', 'View History'];
        this.targetRoutes = ['bookmarks', 'featured', 'histories'];

        this.bookmarks = [];
        this.badges = new Map();
    }

    $onInit() {

        this.loadBookmarks(this.options[0]);
        this.loadFeaturedChannels(this.options[1]);
        this.loadHistories(this.options[2]);
        this.registerBookmarkEvents();
        this.registerViewHistoryEvents();
    }

    addGameName(channels) {

        return channels.map(_ => {

            _.game_name = _.provider_game_name;

            return _;
        });
    }

    async loadBookmarks(key) {

        this.bookmarks = await this.service.getBookmarks();
        this.badges.set(key, this.bookmarks.slice(0, 3));
    }

    async loadFeaturedChannels(key) {

        try {

            const api = 'http://127.0.0.1:4150/api/v1/channels';
            const response = await this.$http.get(api);
            const channels = response.data.slice(0, 3);
            this.badges.set(key, this.addGameName(channels));
        }
        catch (error) {

            console.log(error);
        }
    }

    async loadHistories(key) {

        const histories = await this.service.getHistories();
        this.badges.set(key, histories.slice(0, 3));
    }

    registerBookmarkEvents() {

        const timeout = { timeOut: 2500 };

        this.$scope.$on('followedChannel', async () => {

            await this.loadBookmarks(this.options[0]);
            this.toastr.success('You just followed a channel.', timeout);
        });

        this.$scope.$on('unfollowedChannel', async () => {

            await this.loadBookmarks(this.options[0]);
            this.toastr.error('You just unfollowed a channel.', timeout);
        });
    }

    registerViewHistoryEvents() {

        this.$scope.$on('historyUpdated', async () => {

            await this.loadHistories(this.options[2]);
        });
    }
}

export const SidebarComponent = {

    bindings: {

        hideOptions: '<'
    },
    templateUrl: './app/common/sidebar/sidebar.html',
    controller: Sidebar
};
