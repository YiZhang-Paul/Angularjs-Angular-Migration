import { Injectable } from '@angular/core';

import { GameManager } from '../../../upgraded-providers/game-manager-provider/game-manager-provider';

@Injectable({
    providedIn: 'root'
})
export class GameFinder {

    private _gameManager: GameManager;

    constructor(gameManager: GameManager) {

        this._gameManager = gameManager;
    }

    private containsName(contained, containing) {

        let index = -1;

        for (const letter of contained) {

            index = containing.indexOf(letter, index + 1);

            if (index === -1) {

                return false;
            }
        }

        return true;
    }

    public findByName(name) {

        const nameWithNoSpace = name.replace(/\s/g, '');

        if (!nameWithNoSpace) {

            return [];
        }

        return this._gameManager.games.filter(_ => {

            return _.name && this.containsName(nameWithNoSpace, _.name);
        });
    }
}
