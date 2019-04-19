import { MatDialogRef } from '@angular/material/dialog';
import { stub } from 'sinon';

export function stubMatDialogRef<T = any>() {

    const stubbed = {} as MatDialogRef<T, any>;

    stubbed.close = stub();

    return stubbed;
}
