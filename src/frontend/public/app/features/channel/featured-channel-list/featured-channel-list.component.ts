import { Component, OnDestroy, OnInit } from '@angular/core';

import { BookmarkManager } from '../../../core/upgraded-providers/bookmark-manager-provider/bookmark-manager-provider';
import { ChannelService } from '../channel.service';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';

@Component({
    selector: 'featured-channel-list',
    styles: [`${require('./featured-channel-list.scss')}`],
    template: require('./featured-channel-list.html')
})
export class FeaturedChannelListComponent implements OnInit, OnDestroy {

    public channels = [];

    private _task: any = null;

    private _bookmarkManager: BookmarkManager;
    private _channelService: ChannelService;
    private _viewHistoryManager: ViewHistoryManagerService;

    constructor(

        bookmarkManager: BookmarkManager,
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

    private setupChannelLoading() {

        this._task = setInterval(() => {

            this._channelService.loadFeaturedChannels(this.channels);

        }, 10 * 1000);
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
