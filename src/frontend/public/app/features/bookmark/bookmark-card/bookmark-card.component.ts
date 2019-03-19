import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'bookmark-card',
    styles: [`${require('./bookmark-card.scss')}`],
    template: require('./bookmark-card.html')
})
export class BookmarkCardComponent {

    @Input() public bookmark: any;
    @Output() public onUnfollow = new EventEmitter();
}
