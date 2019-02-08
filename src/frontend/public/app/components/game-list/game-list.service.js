export class GameListService {

    constructor(gameHttpService) {
        'ngInject';
        this.service = gameHttpService;

        this.games = [];
    }

    _syncGames(games) {

        for (let i = 0; i < games.length; i++) {

            if (this.games[i] && this.games[i].id === games[i].id) {

                this.games[i].view_count = games[i].view_count;

                continue;
            }

            this.games[i] = games[i];
        }
    }

    cacheGames() {

        this.service.getGames().then(games => {

            this._syncGames(games);
        })
        .catch(error => console.log(error));
    }
}
