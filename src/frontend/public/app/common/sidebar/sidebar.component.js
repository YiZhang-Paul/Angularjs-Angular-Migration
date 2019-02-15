import './sidebar.scss';

export class Sidebar {

    constructor($scope, toastr, sidebarService, authenticatorService) {
        'ngInject';
        this.$scope = $scope;
        this.toastr = toastr;
        this.service = sidebarService;
        this.authenticator = authenticatorService;

        this._options = ['Followed Channels', 'Featured Channels', 'View History'];
        this._targetRoutes = ['index.bookmarks', 'index.featured', 'index.histories'];

        this.badges = new Map();
    }

    get options() {

        if (this.authenticator.isAuthenticated) {

            return this._options;
        }

        return [this._options[1]];
    }

    get targetRoutes() {

        if (this.authenticator.isAuthenticated) {

            return this._targetRoutes;
        }

        return [this._targetRoutes[1]];
    }

    $onInit() {

        if (this.authenticator.isAuthenticated) {

            this._loadBookmarks();
            this._loadHistories();
        }

        this._loadFeaturedChannels();
        this._registerEvents();
    }

    _loadBookmarks() {

        const key = this._options[0];

        this.service.getBookmarks().then(bookmarks => {

            this.badges.set(key, bookmarks.slice(0, 3));
        });
    }

    _loadHistories() {

        const key = this._options[2];

        this.service.getHistories().then(histories => {

            this.badges.set(key, histories.slice(0, 3));
        });
    }

    _loadFeaturedChannels() {

        const key = this._options[1];

        this.service.getFeaturedChannels().then(channels => {

            this.badges.set(key, channels.slice(0, 3));
        });
    }

    _registerAuthenticationEvents() {

        this.$scope.$on('userAuthenticated', () => {

            this._loadBookmarks();
            this._loadHistories();
        });

        this.$scope.$on('userLoggedOut', () => {

            this.badges.delete(this._options[0]);
            this.badges.delete(this._options[2]);
        });
    }

    _registerBookmarkEvents() {

        const timeout = { timeOut: 2500 };

        this.$scope.$on('followedChannel', () => {

            this._loadBookmarks();
            this.toastr.success('You just followed a channel.', timeout);
        });

        this.$scope.$on('unfollowedChannel', () => {

            this._loadBookmarks();
            this.toastr.error('You just unfollowed a channel.', timeout);
        });
    }

    _registerViewHistoryEvents() {

        const events = ['Updated', 'Removed', 'Cleared'];

        for (const event of events) {

            this.$scope.$on(`history${event}`, () => {

                this._loadHistories();
            });
        }
    }

    _registerEvents() {

        this._registerAuthenticationEvents();
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
