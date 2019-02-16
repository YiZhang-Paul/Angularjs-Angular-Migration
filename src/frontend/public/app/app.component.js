import '../style.scss';

export class AppController {

    constructor(authenticatorService, bookmarkManagerService) {
        'ngInject';
        this.authenticator = authenticatorService;
        this.bookmarkService = bookmarkManagerService;
    }

    $onInit() {

        if (this.authenticator.isAuthenticated) {

            this.bookmarkService.cacheBookmarks();
        }
    }
}

export const AppComponent = {

    templateUrl: 'app/app.html',
    controller: AppController
};
