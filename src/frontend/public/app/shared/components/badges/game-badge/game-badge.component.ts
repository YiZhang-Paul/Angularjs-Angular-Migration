import { Component, Input } from '@angular/core';

@Component({
    selector: 'game-badge',
    styleUrls: ['./game-badge.scss'],
    templateUrl: './game-badge.html'
})
export class GameBadgeComponent {

    @Input() public game: any;
}
