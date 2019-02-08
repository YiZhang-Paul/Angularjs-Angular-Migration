import './top-navigation-bar.css';

export class TopNavigationBar {

    constructor($state, $rootScope, authenticatorService) {
        'ngInject';
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.authenticator = authenticatorService;
    }

    login() {

        const credentials = ['john doe', 'password'];

        this.authenticator.requestToken(...credentials).then(() => {

            this.$state.reload();
            this.$rootScope.$broadcast('userAuthenticated');
        });
    }
}

export const TopNavigationBarComponent = {

    templateUrl: 'app/common/top-navigation-bar/top-navigation-bar.html',
    controller: TopNavigationBar
};
