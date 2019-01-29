export default $stateProvider => {

    const histories = {

        url: '/histories',
        templateUrl: './app/components/view-history/view-history.html'
    };

    $stateProvider.state('histories', histories);
}
