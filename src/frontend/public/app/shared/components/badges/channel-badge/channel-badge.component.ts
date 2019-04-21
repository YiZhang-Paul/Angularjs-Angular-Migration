import { Component, Input } from '@angular/core';

@Component({
    selector: 'channel-badge',
    styleUrls: ['./channel-badge.scss'],
    templateUrl: './channel-badge.html'
})
export class ChannelBadgeComponent {

    @Input() public badge: any;
}
