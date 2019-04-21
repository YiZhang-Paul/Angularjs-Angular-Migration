import { expect } from 'chai';
import { assert as sinonExpect, stub } from 'sinon';

import { stubMatDialogRef } from '../../../../testing/stubs/built-in/mat-dialog-ref.stub';

import { UserLoginDialog } from './user-login-dialog';

context('user login dialog unit test', () => {

    let dialog: UserLoginDialog;

    let callbackStub: any;
    let matDialogRefStub: any;

    beforeEach('stubs setup', () => {

        callbackStub = stub().resolves();
        matDialogRefStub = stubMatDialogRef();
    });

    beforeEach('general test setup', () => {

        const data = { callback: callbackStub };
        dialog = new UserLoginDialog(data, matDialogRefStub);
    });

    it('should resolve', () => {

        expect(dialog).is.not.null;
        expect(dialog).to.be.instanceOf(UserLoginDialog);
    });

    describe('onLogin()', () => {

        it('should invoke login callback with user credentials', () => {

            const expected = { username: 'username_1', password: 'password_1' };
            dialog.username = expected.username;
            dialog.password = expected.password;

            dialog.onLogin();

            sinonExpect.calledOnce(callbackStub);
            sinonExpect.calledWith(callbackStub, expected);
        });

        it('should close panel on successful login', async () => {

            await dialog.onLogin();

            sinonExpect.calledOnce(matDialogRefStub.close);
        });

        it('should not close panel on login failure', async () => {

            callbackStub.rejects(new Error());

            await dialog.onLogin();

            sinonExpect.notCalled(matDialogRefStub.close);
        });

        it('should indicate login error on login failure', async () => {

            callbackStub.rejects(new Error());

            await dialog.onLogin();

            expect(dialog.noError).to.be.false;
        });
    });

    describe('onKeyup()', () => {

        it('should login when user hits enter key', () => {

            const event = { keyCode: 13 };

            dialog.onKeyup(event);

            sinonExpect.calledOnce(callbackStub);
        });

        it('should not login when user hits other keys', () => {

            const event = { keyCode: 97 };

            dialog.onKeyup(event);

            sinonExpect.notCalled(callbackStub);
        });
    });
});
