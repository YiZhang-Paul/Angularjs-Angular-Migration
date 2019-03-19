import { Component, Input } from '@angular/core';

@Component({
    selector: 'channel-badge',
    styles: [`${require('./channel-badge.scss')}`],
    template: require('./channel-badge.html')
})
export class ChannelBadgeComponent {

    @Input() public badge: any;
}
