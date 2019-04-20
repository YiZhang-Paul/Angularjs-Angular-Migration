import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'clear-histories-dialog',
    styles: [`${require('./clear-histories-dialog.scss')}`],
    template: `${require('./clear-histories-dialog.html')}`
})
export class ClearHistoriesDialog {

    private _dialogRef: MatDialogRef<ClearHistoriesDialog>;

    constructor(dialogRef: MatDialogRef<ClearHistoriesDialog>) {

        this._dialogRef = dialogRef;
    }

    public onClose(isConfirmed): void {

        this._dialogRef.close(isConfirmed);
    }
}
