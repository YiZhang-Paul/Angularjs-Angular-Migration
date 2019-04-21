import { Injectable } from '@angular/core';

import { GameHttpService } from '../../http/game-http/game-http.service';

@Injectable({
    providedIn: 'root'
})
export class GameManagerService {

    public games: any[] = [];

    private _gameHttp: GameHttpService;

    constructor(gameHttp: GameHttpService) {

        this._gameHttp = gameHttp;
    }

    private syncGames(games: any[]): void {

        for (let i = 0; i < games.length; i++) {

            if (this.games[i] && this.games[i].id === games[i].id) {

                this.games[i].view_count = games[i].view_count;

                continue;
            }

            this.games[i] = games[i];
        }
    }

    public async cacheGames(): Promise<void> {

        try {

            this.syncGames(await this._gameHttp.getGames());
        }
        catch (error) {

            console.log(error);
        }
    }
}
