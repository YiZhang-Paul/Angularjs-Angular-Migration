import './sidebar.scss';

export class SidebarController {

    constructor(

        $scope,
        authenticatorService,
        channelHttpService,
        bookmarkManagerService,
        viewHistoryManagerService

    ) {
        'ngInject';
        this.$scope = $scope;
        this.authenticator = authenticatorService;
        this.channelHttp = channelHttpService;
        this.bookmarkManager = bookmarkManagerService;
        this.viewHistoryManager = viewHistoryManagerService;

        this._options = ['Followed Channels', 'Featured Channels', 'View History'];

        this.badges = new Map();
        this.routes = new Map();

        this.routes.set(this._options[0], 'index.bookmarks');
        this.routes.set(this._options[1], 'index.featured');
        this.routes.set(this._options[2], 'index.histories');
    }

    get options() {

        if (this.authenticator.isAuthenticated) {

            return this._options;
        }

        return [this._options[1]];
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

        const bookmarks = this.bookmarkManager.bookmarks;
        this.badges.set(this._options[0], bookmarks.slice(0, 3));
    }

    _loadHistories() {

        const histories = this.viewHistoryManager.histories;
        this.badges.set(this._options[2], histories.slice(0, 3));
    }

    _loadFeaturedChannels() {

        this.channelHttp.getChannels().then(channels => {

            this.badges.set(this._options[1], channels.slice(0, 3));
        })
        .catch(error => console.log(error));
    }

    _registerAuthenticationEvents() {

        this.$scope.$on('userLoggedOut', () => {

            this.badges.delete(this._options[0]);
            this.badges.delete(this._options[2]);
        });
    }

    _registerBookmarkEvents() {

        const events = ['bookmarkCached', 'followedChannel', 'unfollowedChannel'];

        for (const event of events) {

            this.$scope.$on(event, () => this._loadBookmarks());
        }
    }

    _registerViewHistoryEvents() {

        const events = ['Updated', 'Removed', 'Cleared', 'Cached'];

        for (const event of events) {

            this.$scope.$on(`history${event}`, () => this._loadHistories());
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
    templateUrl: 'app/shared/components/sidebar/sidebar.html',
    controller: SidebarController
};
