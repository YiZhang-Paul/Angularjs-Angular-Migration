export class ViewHistoryService {

    constructor($rootScope, viewHistoryHttpService) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.historyService = viewHistoryHttpService;
    }

    getHistories() {

        return this.historyService.getHistories().catch(error => {

            console.log(error);

            return [];
        });
    }

    addHistory(channel) {

        return this.historyService.addHistory(channel).then(() => {

            this.$rootScope.$broadcast('historyUpdated');
        })
        .catch(error => console.log(error));
    }

    deleteHistory(history) {

        const id = history.id;

        return this.historyService.deleteHistory(id).catch(error => {

            console.log(error);
        });
    }

    clearHistories() {

        return this.historyService.deleteHistories()
            .then(() => true)
            .catch(() => false);
    }
}
