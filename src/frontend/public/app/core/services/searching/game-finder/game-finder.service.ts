import { Injectable } from '@angular/core';

import { GameManagerService } from '../../../services/data-managers/game-manager/game-manager.service';

@Injectable({
    providedIn: 'root'
})
export class GameFinder {

    private _gameManager: GameManagerService;

    constructor(gameManager: GameManagerService) {

        this._gameManager = gameManager;
    }

    private containsName(contained: string, containing: string): boolean {

        let index = -1;

        for (const letter of contained) {

            index = containing.indexOf(letter, index + 1);

            if (index === -1) {

                return false;
            }
        }

        return true;
    }

    public findByName(name: string): any[] {

        const nameWithNoSpace = name.replace(/\s/g, '');

        if (!nameWithNoSpace) {

            return [];
        }

        return this._gameManager.games.filter(_ => {

            return _.name && this.containsName(nameWithNoSpace, _.name);
        });
    }
}
