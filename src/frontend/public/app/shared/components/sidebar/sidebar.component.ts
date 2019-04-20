import { Component, Input, OnInit } from '@angular/core';

import { AuthenticatorService } from '../../../core/services/authentication/authenticator/authenticator.service';
import { BookmarkManagerService } from '../../../core/services/data-managers/bookmark-manager/bookmark-manager.service';
import { ChannelHttpService } from '../../../core/services/http/channel-http/channel-http.service';
import { EventManagerService } from '../../../core/services/events/event-manager.service';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';

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
    private _states = ['bookmarks', 'featured', 'histories'];

    private _authenticator: AuthenticatorService;
    private _bookmarkManager: BookmarkManagerService;
    private _channelHttp: ChannelHttpService;
    private _eventManager: EventManagerService;
    private _viewHistoryManager: ViewHistoryManagerService;

    constructor(

        authenticator: AuthenticatorService,
        bookmarkManager: BookmarkManagerService,
        channelHttp: ChannelHttpService,
        eventManager: EventManagerService,
        viewHistoryManager: ViewHistoryManagerService

    ) {

        this._authenticator = authenticator;
        this._bookmarkManager = bookmarkManager;
        this._channelHttp = channelHttp;
        this._eventManager = eventManager;
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

        this._eventManager.subscribe('userLoggedOut', () => {

            this.badges.delete(this._options[0]);
            this.badges.delete(this._options[2]);
        });
    }

    private registerBookmarkEvents() {

        const events = ['bookmarkCached', 'followedChannel', 'unfollowedChannel'];

        for (const event of events) {

            this._eventManager.subscribe(event, () => this.loadBookmarks());
        }
    }

    private registerViewHistoryEvents() {

        const events = ['Updated', 'Removed', 'Cleared', 'Cached'];

        for (const event of events) {

            this._eventManager.subscribe(`history${event}`, () => this.loadHistories());
        }
    }

    private registerEvents() {

        this.registerAuthenticationEvents();
        this.registerBookmarkEvents();
        this.registerViewHistoryEvents();
    }
}
