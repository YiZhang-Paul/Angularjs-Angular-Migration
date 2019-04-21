import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'view-history-card',
    styleUrls: ['./view-history-card.scss'],
    templateUrl: './view-history-card.html'
})
export class ViewHistoryCardComponent {

    @Input() public viewHistory: any;
    @Input() public isStaticThumbnail: boolean;
    @Output() public onChannelNavigation = new EventEmitter();
    @Output() public onDelete = new EventEmitter();
}
