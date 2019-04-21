import { Component, OnDestroy, OnInit } from '@angular/core';

import { BookmarkManagerService } from '../../../core/services/data-managers/bookmark-manager/bookmark-manager.service';
import { ChannelService } from '../channel.service';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';

@Component({
    selector: 'featured-channel-list',
    styleUrls: ['./featured-channel-list.scss'],
    templateUrl: './featured-channel-list.html'
})
export class FeaturedChannelListComponent implements OnInit, OnDestroy {

    public channels: any[] = [];

    private _task: any = null;

    private _bookmarkManager: BookmarkManagerService;
    private _channelService: ChannelService;
    private _viewHistoryManager: ViewHistoryManagerService;

    constructor(

        bookmarkManager: BookmarkManagerService,
        channelService: ChannelService,
        viewHistoryManager: ViewHistoryManagerService

    ) {
        this._bookmarkManager = bookmarkManager;
        this._channelService = channelService;
        this._viewHistoryManager = viewHistoryManager;
    }

    public ngOnInit(): void {

        this._channelService.loadFeaturedChannels(this.channels);
        this.setupChannelLoading();
    }

    private setupChannelLoading(): void {

        this._task = setInterval(() => {

            this._channelService.loadFeaturedChannels(this.channels);

        }, 10 * 1000);
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
