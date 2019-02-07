export const ChannelsState = {

    name: 'channels',

    state: {

        url: '^/games/:name',
        component: 'channel',

        params: {

            game: null,
            channels: null
        }
    }
};

export const FeaturedState = {

    name: 'featured',

    state: {

        url: '^/featured',
        component: 'featuredChannel'
    }
};
