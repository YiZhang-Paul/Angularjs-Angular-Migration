import './top-navigation-bar.css';

export class TopNavigationBar {

    constructor(authenticatorService) {
        'ngInject';
        this.authenticator = authenticatorService;
    }

    get isAuthenticated() {

        return this.authenticator.isAuthenticated;
    }
}

export const TopNavigationBarComponent = {

    templateUrl: 'app/common/top-navigation-bar/top-navigation-bar.html',
    controller: TopNavigationBar
};
