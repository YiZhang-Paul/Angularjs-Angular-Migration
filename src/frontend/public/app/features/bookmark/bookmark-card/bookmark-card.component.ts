import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'bookmark-card',
    styleUrls: ['./bookmark-card.scss'],
    templateUrl: './bookmark-card.html'
})
export class BookmarkCardComponent {

    @Input() public bookmark: any;
    @Output() public onUnfollow = new EventEmitter();
}
