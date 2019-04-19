import '../style.scss';

export class AppController {

    constructor(

        $scope,
        authenticatorService,
        bookmarkManagerService,
        viewHistoryManagerService,
        gameManagerService,
        eventManagerService

    ) {
        'ngInject';
        this.$scope = $scope;
        this.authenticator = authenticatorService;
        this.bookmarkManager = bookmarkManagerService;
        this.viewHistoryManager = viewHistoryManagerService;
        this.gameManager = gameManagerService;
        this.eventManager = eventManagerService;
    }

    $onInit() {

        this._cacheData();
        this._registerAuthenticationEvents();
    }

    _cacheData() {

        if (this.authenticator.isAuthenticated) {

            this.bookmarkManager.cacheBookmarks();
            this.viewHistoryManager.cacheHistories();
        }

        this.gameManager.cacheGames();
    }

    _registerAuthenticationEvents() {

        this.eventManager.subscribe('userAuthenticated', () => {

            this.bookmarkManager.cacheBookmarks();
            this.viewHistoryManager.cacheHistories();
        });

        this.eventManager.subscribe('userLoggedOut', () => {

            this.bookmarkManager.bookmarks = [];
            this.viewHistoryManager.histories = [];
        });
    }
}

export const AppComponent = {

    template: `${require('./app.html')}`,
    controller: AppController
};
