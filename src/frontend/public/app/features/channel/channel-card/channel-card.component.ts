import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ThumbnailPlayerService } from '../../../core/services/utilities/thumbnail-player/thumbnail-player.service';

@Component({
    selector: 'channel-card',
    styleUrls: ['./channel-card.scss'],
    templateUrl: './channel-card.html'
})
export class ChannelCardComponent {

    @Input() public channel: any;
    @Input() public isFollowed: boolean;
    @Output() public onFollow = new EventEmitter();
    @Output() public onUnfollow = new EventEmitter();

    constructor(private _thumbnailPlayer: ThumbnailPlayerService) { }

    public playThumbnail(thumbnail: any): void {

        this._thumbnailPlayer.play(thumbnail);
    }

    public stopThumbnail(thumbnail: any): void {

        this._thumbnailPlayer.stop(thumbnail);
    }
}
