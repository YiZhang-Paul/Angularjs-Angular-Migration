import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transition } from '@uirouter/angular';

import { ChannelService } from '../channel.service';
import { BookmarkManagerService } from '../../../core/services/data-managers/bookmark-manager/bookmark-manager.service';
import { GameHttpService } from '../../../core/services/http/game-http/game-http.service';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';

@Component({
    selector: 'game-channel-list',
    styleUrls: ['./game-channel-list.scss'],
    templateUrl: './game-channel-list.html'
})
export class GameChannelListComponent implements OnInit, OnDestroy {

    public game: any = null;
    public name: string = null;
    public channels: any[] = [];

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

    private async loadGame(): Promise<void> {

        this.game = await this._gameHttp.getGameByName(this.name);
    }

    private loadChannels(): void {

        if (this.game) {

            this._channelService.loadGameChannels(this.channels, this.game.id);
        }
    }

    private async loadComponent(): Promise<void> {

        try {

            await this.loadGame();

            if (!this._stateParams.channels) {

                return this.loadChannels();
            }

            this.channels = this._stateParams.channels;
        }
        catch (error) {

            console.log(error);
        }
    }

    private setupChannelLoading(): void {

        this._task = setInterval(() => this.loadChannels(), 10 * 1000);
    }

    public isFollowed(channel: any): boolean {

        return this._bookmarkManager.isFollowed(channel);
    }

    public follow(channel: any): void {

        this._bookmarkManager.follow(channel);
    }

    public unfollow(channel: any): void {

        this._bookmarkManager.unfollow(channel);
    }

    public addHistory(channel: any): void {

        this._viewHistoryManager.addHistory(channel);
    }

    public ngOnDestroy(): void {

        clearInterval(this._task);
    }
}
