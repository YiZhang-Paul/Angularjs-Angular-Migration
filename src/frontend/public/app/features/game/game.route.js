import { GameListComponent } from './game-list/game-list.component';

export const GameState = {

    name: 'game',

    state: {

        url: '^/games',
        component: GameListComponent
    }
};
