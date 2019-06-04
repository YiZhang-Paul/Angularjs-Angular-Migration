import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'clear-histories-dialog',
    styleUrls: ['./clear-histories-dialog.scss'],
    templateUrl: './clear-histories-dialog.html'
})
export class ClearHistoriesDialog {

    constructor(private _dialogRef: MatDialogRef<ClearHistoriesDialog>) { }

    public onClose(isConfirmed: boolean): void {

        this._dialogRef.close(isConfirmed);
    }
}
