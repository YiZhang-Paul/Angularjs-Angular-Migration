import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'user-widget',
    styleUrls: ['./user-widget.scss'],
    templateUrl: './user-widget.html'
})
export class UserWidgetComponent {

    @Input() public user: any;
    @Output() public onLogout = new EventEmitter();

    public statusOptions = ['Online', 'Invisible'];
    public channelOptions = ['Channel', 'Video Producer', 'Dashboard'];
    public userOptions = ['Friends', 'Subscriptions', 'Inventory', 'Payments'];

    public statusText = this.statusOptions[1];
}
