import { GameChannelListComponent } from './game-channel-list/game-channel-list.component';

const moduleName = 'sample-app-channel';

export default moduleName;

angular.module(moduleName, [])
    .component('gameChannelList', GameChannelListComponent);
