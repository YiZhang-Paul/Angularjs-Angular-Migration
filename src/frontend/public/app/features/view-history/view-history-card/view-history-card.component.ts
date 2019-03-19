import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'view-history-card',
    styles: [`${require('./view-history-card.scss')}`],
    template: require('./view-history-card.html')
})
export class ViewHistoryCardComponent {

    @Input() public viewHistory: any;
    @Input() public isStaticThumbnail: any;
    @Output() public onChannelNavigation = new EventEmitter();
    @Output() public onDelete = new EventEmitter();
}
