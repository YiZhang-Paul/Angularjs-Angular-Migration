export class ViewHistoryListService {

    constructor($mdDialog) {
        'ngInject';
        this.$mdDialog = $mdDialog;
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
}
