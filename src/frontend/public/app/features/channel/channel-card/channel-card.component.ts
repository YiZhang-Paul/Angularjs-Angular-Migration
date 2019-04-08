import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ThumbnailPlayerService } from '../../../core/services/utilities/thumbnail-player/thumbnail-player.service';

@Component({
    selector: 'channel-card',
    styles: [`${require('./channel-card.scss')}`],
    template: require('./channel-card.html')
})
export class ChannelCardComponent {

    @Input() public channel: any;
    @Input() public isFollowed: any;
    @Output() public onFollow = new EventEmitter();
    @Output() public onUnfollow = new EventEmitter();

    private _thumbnailPlayer: ThumbnailPlayerService;

    constructor(thumbnailPlayer: ThumbnailPlayerService) {

        this._thumbnailPlayer = thumbnailPlayer;
    }

    public playThumbnail(thumbnail: any): void {

        this._thumbnailPlayer.play(thumbnail);
    }

    public stopThumbnail(thumbnail: any): void {

        this._thumbnailPlayer.stop(thumbnail);
    }
}
