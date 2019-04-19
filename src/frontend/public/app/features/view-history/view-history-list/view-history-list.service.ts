import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ClearHistoriesDialog } from './clear-histories-dialog/clear-histories-dialog';

@Injectable({
    providedIn: 'root'
})
export class ViewHistoryListService {

    private _dialog: MatDialog;

    constructor(dialog: MatDialog) {

        this._dialog = dialog;
    }

    public showClearHistoriesDialog(): Promise<any> {

        const dialogRef = this._dialog.open(ClearHistoriesDialog, { width: '450px' });

        return dialogRef.afterClosed().toPromise();
    }
}
