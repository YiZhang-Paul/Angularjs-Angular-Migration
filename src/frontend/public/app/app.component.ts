import { Component, OnInit } from '@angular/core';

import { AuthenticatorService } from './core/services/authentication/authenticator/authenticator.service';
import { BookmarkManagerService } from './core/services/data-managers/bookmark-manager/bookmark-manager.service';
import { EventManagerService } from './core/services/events/event-manager.service';
import { GameManagerService } from './core/services/data-managers/game-manager/game-manager.service';
import { ViewHistoryManagerService } from './core/services/data-managers/view-history-manager/view-history-manager.service';

@Component({
    selector: 'app',
    styleUrls: ['../style.scss'],
    templateUrl: './app.html'
})
export class AppComponent implements OnInit {

    private _authenticator: AuthenticatorService;
    private _bookmarkManager: BookmarkManagerService;
    private _eventManager: EventManagerService;
    private _gameManager: GameManagerService;
    private _viewHistoryManager: ViewHistoryManagerService;

    constructor(

        authenticator: AuthenticatorService,
        bookmarkManager: BookmarkManagerService,
        eventManager: EventManagerService,
        gameManager: GameManagerService,
        viewHistoryManager: ViewHistoryManagerService

    ) {

        this._authenticator = authenticator;
        this._bookmarkManager = bookmarkManager;
        this._eventManager = eventManager;
        this._gameManager = gameManager;
        this._viewHistoryManager = viewHistoryManager;
    }

    public ngOnInit(): void {

        this.cacheData();
        this.registerAuthenticationEvents();
    }

    private cacheData(): void {

        if (this._authenticator.isAuthenticated) {

            this._bookmarkManager.cacheBookmarks();
            this._viewHistoryManager.cacheHistories();
        }

        this._gameManager.cacheGames();
    }

    private registerAuthenticationEvents(): void {

        this._eventManager.subscribe('userAuthenticated', () => {

            this._bookmarkManager.cacheBookmarks();
            this._viewHistoryManager.cacheHistories();
        });

        this._eventManager.subscribe('userLoggedOut', () => {

            this._bookmarkManager.bookmarks = [];
            this._viewHistoryManager.histories = [];
        });
    }
}
