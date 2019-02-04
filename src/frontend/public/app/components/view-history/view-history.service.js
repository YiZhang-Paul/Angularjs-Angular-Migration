export class ViewHistoryService {

    constructor($rootScope, viewHistoryHttpService) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.historyService = viewHistoryHttpService;
    }

    addHistory(channel) {

        return this.historyService.addHistory(channel).then(() => {

            this.$rootScope.$broadcast('historyUpdated');
        })
        .catch(error => console.log(error));
    }
}
