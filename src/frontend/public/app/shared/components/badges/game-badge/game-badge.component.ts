import { Component, Input } from '@angular/core';

@Component({
    selector: 'game-badge',
    styles: [`${require('./game-badge.scss')}`],
    template: require('./game-badge.html')
})
export class GameBadgeComponent {

    @Input() public game: any;
}
