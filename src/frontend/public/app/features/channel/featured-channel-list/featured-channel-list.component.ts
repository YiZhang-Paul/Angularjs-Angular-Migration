import { Component, OnDestroy, OnInit } from '@angular/core';

import { BookmarkManager } from '../../../core/upgraded-providers/bookmark-manager-provider/bookmark-manager-provider';
import { ChannelService } from '../channel.service';
import { ViewHistoryManager } from '../../../core/upgraded-providers/view-history-manager-provider/view-history-manager-provider';

@Component({
    selector: 'featured-channel-list',
    styles: [`${require('./featured-channel-list.scss')}`],
    template: require('./featured-channel-list.html')
})
export class FeaturedChannelListComponent implements OnInit, OnDestroy {

    private _task: any = null;
    private _channels = [];

    private _bookmarkManager: BookmarkManager;
    private _channelService: ChannelService;
    private _viewHistoryManager: ViewHistoryManager;

    constructor(

        bookmarkManager: BookmarkManager,
        channelService: ChannelService,
        viewHistoryManager: ViewHistoryManager

    ) {
        this._bookmarkManager = bookmarkManager;
        this._channelService = channelService;
        this._viewHistoryManager = viewHistoryManager;
    }

    public ngOnInit(): void {

        this._channelService.loadFeaturedChannels(this._channels);
        this.setupChannelLoading();
    }

    private setupChannelLoading() {

        this._task = setInterval(() => {

            this._channelService.loadFeaturedChannels(this._channels);

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
