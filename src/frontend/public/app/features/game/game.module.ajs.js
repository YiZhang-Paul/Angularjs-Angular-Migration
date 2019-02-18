import { GameCardComponent } from './game-card/game-card.component';
import { GameListComponent } from './game-list/game-list.component';

const moduleName = 'sample-app-game';

export default moduleName;

angular.module(moduleName, [])
    .component('gameCard', GameCardComponent)
    .component('gameList', GameListComponent);
