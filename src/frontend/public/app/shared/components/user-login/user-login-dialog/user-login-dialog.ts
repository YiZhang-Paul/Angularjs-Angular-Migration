import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'user-login-dialog',
    styles: [`${require('./user-login-dialog.scss')}`],
    template: `${require('./user-login-dialog.html')}`
})
export class UserLoginDialog {

    public username = '';
    public password = '';

    private _noError = true;

    private _data: any;
    private _dialogRef: MatDialogRef<UserLoginDialog>;

    constructor(

        @Inject(MAT_DIALOG_DATA) data: any,
        dialogRef: MatDialogRef<UserLoginDialog>

    ) {

        this._data = data;
        this._dialogRef = dialogRef;
    }

    get noError(): boolean {

        return this._noError;
    }

    public onKeyup(event): void {

        if (event.keyCode === 13) {

            this.onLogin();
        }
    }

    public onLogin(): void {

        const input = { username: this.username, password: this.password };

        if (this._data.callback) {

            this._data.callback(input)
                .then(() => this._dialogRef.close())
                .catch(() => this._noError = false);
        }
    }
}
