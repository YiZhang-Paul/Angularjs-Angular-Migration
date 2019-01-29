export default $stateProvider => {

    const games = {

        url: '/games',
        templateUrl: './app/app.html'
    };

    $stateProvider.state('games', games);
}
