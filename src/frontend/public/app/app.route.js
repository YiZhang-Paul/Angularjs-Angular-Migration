export default ($stateProvider, $urlRouterProvider) => {

    const index = {

        url: '/',
        redirectTo: 'games'
    };

    const error = {

        url: '/error',
        templateUrl: './app/error.html'
    };

    $stateProvider.state('index', index);
    $stateProvider.state('error', error);
    $urlRouterProvider.otherwise('/error');
}
