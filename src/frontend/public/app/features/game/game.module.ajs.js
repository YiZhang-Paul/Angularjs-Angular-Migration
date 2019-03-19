import { GameListComponent } from './game-list/game-list.component';

const moduleName = 'sample-app-game';

export default moduleName;

angular.module(moduleName, [])
    .component('gameList', GameListComponent);
