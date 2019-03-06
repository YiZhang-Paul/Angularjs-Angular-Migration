import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ThumbnailPlayer } from '../../../core/upgraded-providers/thumbnail-player-provider/thumbnail-player-provider';

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

    private _thumbnailPlayer: ThumbnailPlayer;

    constructor(thumbnailPlayer: ThumbnailPlayer) {

        this._thumbnailPlayer = thumbnailPlayer;
    }

    public playThumbnail(thumbnail: any): void {

        this._thumbnailPlayer.play(thumbnail);
    }

    public stopThumbnail(thumbnail: any): void {

        this._thumbnailPlayer.stop(thumbnail);
    }
}
