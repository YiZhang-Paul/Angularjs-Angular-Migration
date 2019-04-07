import { Injectable } from '@angular/core';

import { $mdDialog } from '../../../core/upgraded-providers/$mdDialog-provider/$mdDialog-provider';

@Injectable({
    providedIn: 'root'
})
export class ViewHistoryListService {

    private _$mdDialog: $mdDialog;

    constructor($mdDialog: $mdDialog) {

        this._$mdDialog = $mdDialog;
    }

    public showClearHistoriesDialog(event): Promise<any> {

        const options = this._$mdDialog.confirm()
            .title('Clear all view histories?')
            .textContent('All view histories will be permanently deleted.')
            .targetEvent(event)
            .ok('Ok')
            .cancel('Cancel');

        return this._$mdDialog.show(options);
    }
}
