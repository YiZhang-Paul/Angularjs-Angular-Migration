import '../style.scss';

export class AppController {

    constructor(

        authenticatorService,
        bookmarkManagerService,
        viewHistoryManagerService

    ) {
        'ngInject';
        this.authenticator = authenticatorService;
        this.bookmarkManager = bookmarkManagerService;
        this.viewHistoryManager = viewHistoryManagerService;
    }

    $onInit() {

        if (this.authenticator.isAuthenticated) {

            this.bookmarkManager.cacheBookmarks();
            this.viewHistoryManager.cacheHistories();
        }
    }
}

export const AppComponent = {

    templateUrl: 'app/app.html',
    controller: AppController
};
