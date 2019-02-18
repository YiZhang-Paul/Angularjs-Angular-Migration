export class ViewHistoryManagerService {

    constructor($rootScope, viewHistoryHttpService) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.viewHistoryHttp = viewHistoryHttpService;

        this.histories = [];
    }

    cacheHistories() {

        return this.viewHistoryHttp.getHistories().then(histories => {

            this.histories = histories.length ? histories : this.histories;
            this.$rootScope.$broadcast('historyCached');
        })
        .catch(error => console.log(error));
    }

    addHistory(channel) {

        return this.viewHistoryHttp.addHistory(channel)
            .then(() => this.cacheHistories())
            .then(() => this.$rootScope.$broadcast('historyUpdated'))
            .catch(error => console.log(error));
    }

    _removeCached(id) {

        const index = this.histories.findIndex(_ => _.id === id);

        if (index !== -1) {

            this.histories.splice(index, 1);
        }
    }

    deleteHistory(id) {

        this.viewHistoryHttp.deleteHistory(id).then(() => {

            this._removeCached(id);
            this.$rootScope.$broadcast('historyRemoved');
        })
        .catch(error => console.log(error));
    }

    clearHistories() {

        return this.viewHistoryHttp.deleteHistories().then(() => {

            this.histories = [];
            this.$rootScope.$broadcast('historyCleared');
        })
        .catch(error => console.log(error));
    }
}
