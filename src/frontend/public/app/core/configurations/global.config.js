export default ($transitionsProvider, $windowProvider, $locationProvider) => {
    'ngInject';
    const $transitions = $transitionsProvider.$get();

    $transitions.onSuccess({}, () => {

        const $window = $windowProvider.$get();
        $window.scrollTo(0, 0);
    });

    $locationProvider.html5Mode(true);
}
