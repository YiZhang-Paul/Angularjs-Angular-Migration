import { Component, EventEmitter, Output } from '@angular/core';

import { GameFinder } from '../../../core/services/searching/game-finder/game-finder.service';

@Component({
    selector: 'search-box',
    styleUrls: ['./search-box.scss'],
    templateUrl: './search-box.html'
})
export class SearchBoxComponent {

    @Output() public onSearch = new EventEmitter();

    private _gameFinder: GameFinder;

    constructor(gameFinder: GameFinder) {

        this._gameFinder = gameFinder;
    }

    public search(keyword: string): void {

        const result = {

            games: this._gameFinder.findByName(keyword)
        };

        this.onSearch.emit(result);
    }
}
