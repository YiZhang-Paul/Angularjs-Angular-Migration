export default ($transitionsProvider, $windowProvider, $urlServiceProvider, $locationProvider, toastrConfig) => {

    const $transitions = $transitionsProvider.$get();

    $transitions.onSuccess({}, () => {

        const $window = $windowProvider.$get();
        $window.scrollTo(0, 0);
    });

    const $urlService = $urlServiceProvider.$get();
    $urlService.deferIntercept();

    $locationProvider.html5Mode(true);
    angular.extend(toastrConfig, { maxOpened: 5, newestOnTop: true });
}
