export class GameService {

    syncGames(oldGames, newGames) {

        for (let i = 0; i < newGames.length; i++) {

            if (oldGames[i] && oldGames[i].id === newGames[i].id) {

                oldGames[i].view_count = newGames[i].view_count;

                continue;
            }

            oldGames[i] = newGames[i];
        }
    }
}
