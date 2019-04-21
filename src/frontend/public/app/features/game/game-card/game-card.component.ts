import { Component, Input } from '@angular/core';

@Component({
    selector: 'game-card',
    styleUrls: ['./game-card.scss'],
    templateUrl: './game-card.html'
})
export class GameCardComponent {

    @Input() public game: any;
}
