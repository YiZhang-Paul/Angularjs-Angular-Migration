export default $stateProvider => {

    const channels = {

        url: '/games/:name',
        templateUrl: './app/components/channel/channel.html',
        params: {
            game: null,
            channels: null
        }
    }

    const featured = {

        url: '/featured',
        templateUrl: './app/components/channel/featured-channel/featured-channel.html'
    };

    $stateProvider.state('channels', channels);
    $stateProvider.state('featured', featured);
}