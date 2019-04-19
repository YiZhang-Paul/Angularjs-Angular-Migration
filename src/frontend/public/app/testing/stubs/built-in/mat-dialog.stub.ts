import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { stub } from 'sinon';

export function stubMatDialog() {

    const stubbed = {} as MatDialog;

    stubbed.open = stub().returns({} as MatDialogRef<any, any>);

    return stubbed;
}
