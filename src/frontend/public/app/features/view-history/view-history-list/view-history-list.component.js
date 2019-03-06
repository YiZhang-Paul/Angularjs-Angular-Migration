import './view-history-list.scss';

export class ViewHistoryListController {

    constructor(

        $scope,
        viewHistoryManagerService,
        viewHistoryListService,
        customRoutingService

    ) {
        'ngInject';
        this.$scope = $scope;
        this.viewHistoryManager = viewHistoryManagerService;
        this.viewHistoryListService = viewHistoryListService;
        this.customRouting = customRoutingService;
    }

    get histories() {

        return this.viewHistoryManager.histories;
    }

    $onInit() {

        this.viewHistoryManager.cacheHistories();
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

        this.viewHistoryListService.showClearHistoriesDialog(event).then(() => {

            return this.viewHistoryManager.clearHistories();
        })
        .catch(error => console.log(error));
    }
}

export const ViewHistoryListComponent = {

    templateUrl: 'app/features/view-history/view-history-list/view-history-list.html',
    controller: ViewHistoryListController
};
