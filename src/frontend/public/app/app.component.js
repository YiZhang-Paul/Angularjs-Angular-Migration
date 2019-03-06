import '../style.scss';

export class AppController {

    constructor(

        $scope,
        authenticatorService,
        bookmarkManagerService,
        viewHistoryManagerService,
        gameManagerService

    ) {
        'ngInject';
        this.$scope = $scope;
        this.authenticator = authenticatorService;
        this.bookmarkManager = bookmarkManagerService;
        this.viewHistoryManager = viewHistoryManagerService;
        this.gameManager = gameManagerService;
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

        this.$scope.$on('userAuthenticated', () => {

            this.bookmarkManager.cacheBookmarks();
            this.viewHistoryManager.cacheHistories();
        });

        this.$scope.$on('userLoggedOut', () => {

            this.bookmarkManager.bookmarks = [];
            this.viewHistoryManager.histories = [];
        });
    }
}

export const AppComponent = {

    templateUrl: 'app/app.html',
    controller: AppController
};
