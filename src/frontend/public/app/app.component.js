import '../style.scss';

export class AppController {

    constructor(

        authenticatorService,
        bookmarkManagerService,
        viewHistoryManagerService

    ) {
        'ngInject';
        this.authenticator = authenticatorService;
        this.bookmarkService = bookmarkManagerService;
        this.historyService = viewHistoryManagerService;
    }

    $onInit() {

        if (this.authenticator.isAuthenticated) {

            this.bookmarkService.cacheBookmarks();
            this.historyService.cacheHistories();
        }
    }
}

export const AppComponent = {

    templateUrl: 'app/app.html',
    controller: AppController
};
