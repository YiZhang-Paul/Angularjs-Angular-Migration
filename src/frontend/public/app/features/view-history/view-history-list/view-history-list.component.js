import './view-history-list.scss';

export class ViewHistoryListController {

    constructor(

        $scope,
        viewHistoryManagerService,
        customRoutingService

    ) {
        'ngInject';
        this.$scope = $scope;
        this.viewHistoryManager = viewHistoryManagerService;
        this.customRouting = customRoutingService;
    }

    get histories() {

        return this.viewHistoryManager.histories;
    }

    $onInit() {

        this.viewHistoryManager.cacheHistories();
        this._registerAuthenticationEvents();
    }

    _registerAuthenticationEvents() {

        this.$scope.$on('userAuthenticated', () => {

            this.viewHistoryManager.cacheHistories();
        });

        this.$scope.$on('userLoggedOut', () => {

            this.viewHistoryManager.histories = [];
        });
    }

    isStaticImage(url) {

        return !/(mp4|m4v)$/i.test(url);
    }

    toChannelsView(id) {

        this.customRouting.toChannelsView(id);
    }

    deleteHistory(history) {

        this.viewHistoryManager.deleteHistory(history.id);
    }

    confirmClearHistories(event) {

        this.viewHistoryManager.showClearHistoriesDialog(event).then(() => {

            return this.viewHistoryManager.clearHistories();
        })
        .catch(error => console.log(error));
    }
}

export const ViewHistoryListComponent = {

    templateUrl: 'app/features/view-history/view-history-list/view-history-list.html',
    controller: ViewHistoryListController
};
