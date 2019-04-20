import { GameChannelListComponent } from './game-channel-list/game-channel-list.component';
import { FeaturedChannelListComponent } from './featured-channel-list/featured-channel-list.component';

export const ChannelsState = {

    name: 'channels',

    state: {

        url: '^/games/:name',
        component: GameChannelListComponent,
        params: { channels: null }
    }
};

export const FeaturedState = {

    name: 'featured',

    state: {

        url: '^/featured',
        component: FeaturedChannelListComponent
    }
};
