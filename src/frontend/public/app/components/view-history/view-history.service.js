export class ViewHistoryService {

    constructor($rootScope, $mdDialog, viewHistoryHttpService) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.$mdDialog = $mdDialog;
        this.historyService = viewHistoryHttpService;

        this.histories = [];
    }

    getHistories() {

        return this.historyService.getHistories().catch(error => {

            console.log(error);

            return [];
        });
    }

    cacheHistories() {

        return this.getHistories().then(histories => {

            this.histories = histories.length ? histories : this.histories;
        });
    }

    addHistory(channel) {

        return this.historyService.addHistory(channel).then(() => {

            this.$rootScope.$broadcast('historyUpdated');

            return this.cacheHistories();
        })
        .catch(error => console.log(error));
    }

    _removeCached(id) {

        const index = this.histories.findIndex(_ => _.id === id);

        if (index !== -1) {

            this.histories.splice(index, 1);
        }
    }

    deleteHistory(id) {

        this.historyService.deleteHistory(id).then(() => {

            this._removeCached(id);
            this.$rootScope.$broadcast('historyRemoved');
        })
        .catch(error => console.log(error));
    }

    showClearHistoriesDialog(event) {

        const options = this.$mdDialog.confirm()
            .title('Clear all view histories?')
            .textContent('All view histories will be permanently deleted.')
            .targetEvent(event)
            .ok('Ok')
            .cancel('Cancel');

        return this.$mdDialog.show(options);
    }

    clearHistories() {

        return this.historyService.deleteHistories().then(() => {

            this.histories = [];
            this.$rootScope.$broadcast('historyCleared');
        })
        .catch(error => console.log(error));
    }
}
