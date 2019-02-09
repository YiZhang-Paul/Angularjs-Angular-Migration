import './top-navigation-bar.css';

export class TopNavigationBar {
    // TODO: move to login component
    // login() {

    //     const credentials = ['john doe', 'password'];

    //     this.authenticator.requestToken(...credentials).then(() => {

    //         this.$state.reload();
    //         this.$rootScope.$broadcast('userAuthenticated');
    //     });
    // }
}

export const TopNavigationBarComponent = {

    templateUrl: 'app/common/top-navigation-bar/top-navigation-bar.html',
    controller: TopNavigationBar
};
