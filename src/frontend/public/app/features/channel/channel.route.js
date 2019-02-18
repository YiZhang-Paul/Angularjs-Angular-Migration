export const ChannelsState = {

    name: 'channels',

    state: {

        url: '^/games/:name',
        component: 'gameChannelList',
        params: { channels: null }
    }
};

export const FeaturedState = {

    name: 'featured',

    state: {

        url: '^/featured',
        component: 'featuredChannelList'
    }
};
