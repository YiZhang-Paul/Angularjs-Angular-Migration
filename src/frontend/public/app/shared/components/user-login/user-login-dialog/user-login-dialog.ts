import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'user-login-dialog',
    styleUrls: ['./user-login-dialog.scss'],
    templateUrl: './user-login-dialog.html'
})
export class UserLoginDialog {

    public username = '';
    public password = '';

    private _noError = true;

    constructor(@Inject(MAT_DIALOG_DATA) private _data: { callback: Function },
                private _dialogRef: MatDialogRef<UserLoginDialog>) { }

    get noError(): boolean {

        return this._noError;
    }

    public onKeyup(event: any): void {

        if (event.keyCode === 13) {

            this.onLogin();
        }
    }

    public async onLogin(): Promise<void> {

        const input = { username: this.username, password: this.password };

        if (this._data.callback) {

            try {

                await this._data.callback(input);
                this._dialogRef.close();
            }
            catch (error) {

                this._noError = false;
            }
        }
    }
}
