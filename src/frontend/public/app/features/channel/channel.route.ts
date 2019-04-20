import { GameChannelListComponent } from './game-channel-list/game-channel-list.component';
import { FeaturedChannelListComponent } from './featured-channel-list/featured-channel-list.component';

export const ChannelsState = {

    name: 'channels',
    url: '^/games/:name',
    component: GameChannelListComponent,
    params: { channels: null }
};

export const FeaturedState = {

    name: 'featured',
    url: '^/featured',
    component: FeaturedChannelListComponent
};
