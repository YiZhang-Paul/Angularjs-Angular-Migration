import { Component, Input, OnInit } from '@angular/core';

import { $rootScope } from '../../../core/upgraded-providers/$rootScope-provider/$rootScope-provider';
import { AuthenticatorService } from '../../../core/services/authentication/authenticator/authenticator.service';
import { BookmarkManager } from '../../../core/upgraded-providers/bookmark-manager-provider/bookmark-manager-provider';
import { ChannelHttpService } from '../../../core/services/http/channel-http/channel-http.service';
import { ViewHistoryManager } from '../../../core/upgraded-providers/view-history-manager-provider/view-history-manager-provider';

@Component({
    selector: 'sidebar',
    styles: [`${require('./sidebar.scss')}`],
    template: require('./sidebar.html')
})
export class SidebarComponent implements OnInit {

    @Input() public hideOptions: any;
    public badges = new Map();
    public routes = new Map();

    private _options = ['Followed Channels', 'Featured Channels', 'View History'];
    private _states = ['index.bookmarks', 'index.featured', 'index.histories'];

    private _$scope: any;
    private _authenticator: AuthenticatorService;
    private _bookmarkManager: BookmarkManager;
    private _channelHttp: ChannelHttpService;
    private _viewHistoryManager: ViewHistoryManager;

    constructor(

        $rootScope: $rootScope,
        authenticator: AuthenticatorService,
        bookmarkManager: BookmarkManager,
        channelHttp: ChannelHttpService,
        viewHistoryManager: ViewHistoryManager

    ) {

        this._$scope = $rootScope.$new();
        this._authenticator = authenticator;
        this._bookmarkManager = bookmarkManager;
        this._channelHttp = channelHttp;
        this._viewHistoryManager = viewHistoryManager;
    }

    get options() {

        if (this._authenticator.isAuthenticated) {

            return this._options;
        }

        return [this._options[1]];
    }

    public ngOnInit() {

        this.initializeMaps();
        this.registerEvents();
        this.loadFeaturedChannels();

        if (this._authenticator.isAuthenticated) {

            this.loadBookmarks();
            this.loadHistories();
        }
    }

    private initializeMaps() {

        this._options.forEach((_, index) => {

            this.badges.set(_, []);
            this.routes.set(_, this._states[index]);
        });
    }

    private loadBookmarks() {

        const bookmarks = this._bookmarkManager.bookmarks;
        this.badges.set(this._options[0], bookmarks.slice(0, 3));
    }

    private loadHistories() {

        const histories = this._viewHistoryManager.histories;
        this.badges.set(this._options[2], histories.slice(0, 3));
    }

    private loadFeaturedChannels() {

        this._channelHttp.getChannels().then(channels => {

            this.badges.set(this._options[1], channels.slice(0, 3));
        })
        .catch(error => console.log(error));
    }

    private registerAuthenticationEvents() {

        this._$scope.$on('userLoggedOut', () => {

            this.badges.delete(this._options[0]);
            this.badges.delete(this._options[2]);
        });
    }

    private registerBookmarkEvents() {

        const events = ['bookmarkCached', 'followedChannel', 'unfollowedChannel'];

        for (const event of events) {

            this._$scope.$on(event, () => this.loadBookmarks());
        }
    }

    private registerViewHistoryEvents() {

        const events = ['Updated', 'Removed', 'Cleared', 'Cached'];

        for (const event of events) {

            this._$scope.$on(`history${event}`, () => this.loadHistories());
        }
    }

    private registerEvents() {

        this.registerAuthenticationEvents();
        this.registerBookmarkEvents();
        this.registerViewHistoryEvents();
    }
}
