import { Component, OnInit } from '@angular/core';

import { AuthenticatorService } from '../../../core/services/authentication/authenticator/authenticator.service';
import { BookmarkManagerService } from '../../../core/services/data-managers/bookmark-manager/bookmark-manager.service';
import { ChannelHttpService } from '../../../core/services/http/channel-http/channel-http.service';
import { EventManagerService } from '../../../core/services/events/event-manager.service';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';

@Component({
    selector: 'sidebar',
    styleUrls: ['./sidebar.scss'],
    templateUrl: './sidebar.html'
})
export class SidebarComponent implements OnInit {

    public badges = new Map<string, any[]>();
    public routes = new Map<string, string>();

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

    get options(): any[] {

        if (this._authenticator.isAuthenticated) {

            return this._options;
        }

        return [this._options[1]];
    }

    public ngOnInit(): void {

        this.initializeMaps();
        this.registerEvents();
        this.loadFeaturedChannels();

        if (this._authenticator.isAuthenticated) {

            this.loadBookmarks();
            this.loadHistories();
        }
    }

    private initializeMaps(): void {

        this._options.forEach((_, index) => {

            this.badges.set(_, []);
            this.routes.set(_, this._states[index]);
        });
    }

    private loadBookmarks(): void {

        const bookmarks = this._bookmarkManager.bookmarks;
        this.badges.set(this._options[0], bookmarks.slice(0, 3));
    }

    private loadHistories(): void {

        const histories = this._viewHistoryManager.histories;
        this.badges.set(this._options[2], histories.slice(0, 3));
    }

    private async loadFeaturedChannels(): Promise<void> {

        try {

            const channels = await this._channelHttp.getChannels();
            this.badges.set(this._options[1], channels.slice(0, 3));
        }
        catch (error) {

            console.log(error);
        }
    }

    private registerAuthenticationEvents(): void {

        this._eventManager.subscribe('userLoggedOut', () => {

            this.badges.delete(this._options[0]);
            this.badges.delete(this._options[2]);
        });
    }

    private registerBookmarkEvents(): void {

        const events = ['bookmarkCached', 'followedChannel', 'unfollowedChannel'];

        for (const event of events) {

            this._eventManager.subscribe(event, () => this.loadBookmarks());
        }
    }

    private registerViewHistoryEvents(): void {

        const events = ['Updated', 'Removed', 'Cleared', 'Cached'];

        for (const event of events) {

            this._eventManager.subscribe(`history${event}`, () => this.loadHistories());
        }
    }

    private registerEvents(): void {

        this.registerAuthenticationEvents();
        this.registerBookmarkEvents();
        this.registerViewHistoryEvents();
    }
}
