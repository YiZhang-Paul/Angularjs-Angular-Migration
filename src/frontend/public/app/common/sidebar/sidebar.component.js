import './sidebar.css';

export class Sidebar {

    constructor($scope, toastr, sidebarService) {
        'ngInject';
        this.$scope = $scope;
        this.toastr = toastr;
        this.service = sidebarService;

        this.options = ['Followed Channels', 'Featured Channels', 'View History'];
        this.targetRoutes = ['index.bookmarks', 'index.featured', 'index.histories'];

        this.badges = new Map();
    }

    $onInit() {

        this._loadBadges();
        this._registerEvents();
    }

    _loadBookmarks(key) {

        this.service.getBookmarks().then(bookmarks => {

            this.badges.set(key, bookmarks.slice(0, 3));
        });
    }

    _loadFeaturedChannels(key) {

        this.service.getFeaturedChannels().then(channels => {

            this.badges.set(key, channels.slice(0, 3));
        });
    }

    _loadHistories(key) {

        this.service.getHistories().then(histories => {

            this.badges.set(key, histories.slice(0, 3));
        });
    }

    _loadBadges() {

        this._loadBookmarks(this.options[0]);
        this._loadFeaturedChannels(this.options[1]);
        this._loadHistories(this.options[2]);
    }

    _registerBookmarkEvents() {

        const timeout = { timeOut: 2500 };

        this.$scope.$on('followedChannel', () => {

            this._loadBookmarks(this.options[0]);
            this.toastr.success('You just followed a channel.', timeout);
        });

        this.$scope.$on('unfollowedChannel', () => {

            this._loadBookmarks(this.options[0]);
            this.toastr.error('You just unfollowed a channel.', timeout);
        });
    }

    _registerViewHistoryEvents() {

        const events = ['Updated', 'Removed', 'Cleared'];

        for (const event of events) {

            this.$scope.$on(`history${event}`, () => {

                this._loadHistories(this.options[2]);
            });
        }
    }

    _registerEvents() {

        this._registerBookmarkEvents();
        this._registerViewHistoryEvents();
    }
}

export const SidebarComponent = {

    bindings: {

        hideOptions: '<'
    },
    templateUrl: 'app/common/sidebar/sidebar.html',
    controller: Sidebar
};
