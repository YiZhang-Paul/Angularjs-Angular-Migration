import { Component, Input } from '@angular/core';

@Component({
    selector: 'game-card',
    styles: [`${require('./game-card.scss')}`],
    template: require('./game-card.html')
})
export class GameCardComponent {

    @Input() public game: any;
}
