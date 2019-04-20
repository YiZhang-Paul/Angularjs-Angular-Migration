import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transition } from '@uirouter/angular';

import { ChannelService } from '../channel.service';
import { BookmarkManagerService } from '../../../core/services/data-managers/bookmark-manager/bookmark-manager.service';
import { GameHttpService } from '../../../core/services/http/game-http/game-http.service';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';

@Component({
    selector: 'game-channel-list',
    styles: [`${require('./game-channel-list.scss')}`],
    template: require('./game-channel-list.html')
})
export class GameChannelListComponent implements OnInit, OnDestroy {

    public game: any = null;
    public name: any = null;
    public channels = [];

    private _task: any = null;
    private _stateParams: any;

    private _gameHttp: GameHttpService;
    private _channelService: ChannelService;
    private _bookmarkManager: BookmarkManagerService;
    private _viewHistoryManager: ViewHistoryManagerService;

    constructor(

        transition: Transition,
        gameHttp: GameHttpService,
        channelService: ChannelService,
        bookmarkManager: BookmarkManagerService,
        viewHistoryManager: ViewHistoryManagerService

    ) {

        this._stateParams = transition.params();
        this._gameHttp = gameHttp;
        this._channelService = channelService;
        this._bookmarkManager = bookmarkManager;
        this._viewHistoryManager = viewHistoryManager;
    }

    public ngOnInit(): void {

        this.name = this._stateParams.name.replace(/-/g, ' ');
        this.loadComponent();
        this.setupChannelLoading();
    }

    private loadGame() {

        return this._gameHttp.getGameByName(this.name).then(game => {

            this.game = game;
        });
    }

    private loadChannels() {

        if (this.game) {

            this._channelService.loadGameChannels(this.channels, this.game.id);
        }
    }

    private loadComponent() {

        this.loadGame().then(() => {

            if (!this._stateParams.channels) {

                return this.loadChannels();
            }

            this.channels = this._stateParams.channels;
        })
        .catch(error => console.log(error));
    }

    private setupChannelLoading() {

        this._task = setInterval(() => this.loadChannels(), 10 * 1000);
    }

    public isFollowed(channel) {

        return this._bookmarkManager.isFollowed(channel);
    }

    public follow(channel) {

        this._bookmarkManager.follow(channel);
    }

    public unfollow(channel) {

        this._bookmarkManager.unfollow(channel);
    }

    public addHistory(channel) {

        this._viewHistoryManager.addHistory(channel);
    }

    public ngOnDestroy(): void {

        clearInterval(this._task);
    }
}
