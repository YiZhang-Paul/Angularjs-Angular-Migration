import { FeaturedChannelListComponent } from './featured-channel-list/featured-channel-list.component';
import { GameChannelListComponent } from './game-channel-list/game-channel-list.component';

const moduleName = 'sample-app-channel';

export default moduleName;

angular.module(moduleName, [])
    .component('featuredChannelList', FeaturedChannelListComponent)
    .component('gameChannelList', GameChannelListComponent);
