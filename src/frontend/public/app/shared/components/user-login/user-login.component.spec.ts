import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { expect } from 'chai';
import { assert as sinonExpect } from 'sinon';

import { SharedModule } from '../../shared.module';
import { AuthenticatorService } from '../../../core/services/authentication/authenticator/authenticator.service';
import { UserLoginService } from '../../../core/services/authentication/user-login/user-login.service';
import { stubMatDialog } from '../../../testing/stubs/built-in/mat-dialog.stub';
import { stubAuthenticatorService } from '../../../testing/stubs/custom/authenticator.service.stub';
import { stubUserLoginService } from '../../../testing/stubs/custom/user-login.service.stub';

import { UserLoginComponent } from './user-login.component';

context('user login component unit test', () => {

    let fixture: ComponentFixture<UserLoginComponent>;
    let component: UserLoginComponent;

    let authenticatorStub: any;
    let userLoginStub: any;
    let matDialogStub: any;

    beforeEach('stubs setup', () => {

        authenticatorStub = stubAuthenticatorService();
        userLoginStub = stubUserLoginService();
        matDialogStub = stubMatDialog();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule],
            providers: [

                { provide: AuthenticatorService, useValue: authenticatorStub },
                { provide: UserLoginService, useValue: userLoginStub },
                { provide: MatDialog, useValue: matDialogStub }
            ]
        });

        fixture = TestBed.createComponent(UserLoginComponent);
        component = fixture.componentInstance;
        authenticatorStub = TestBed.get(AuthenticatorService);
        userLoginStub = TestBed.get(UserLoginService);
        matDialogStub = TestBed.get(MatDialog);
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(UserLoginComponent);
    });

    describe('isAuthenticated', () => {

        it('should use authenticator service to check user authentication status', () => {

            const expected = authenticatorStub.isAuthenticated;

            expect(component.isAuthenticated).to.equal(expected);
        });
    });

    describe('tryLogin()', () => {

        it('should open login panel', () => {

            component.tryLogin();

            sinonExpect.calledOnce(matDialogStub.open);
        });

        it('should use login service to log in', async () => {

            const expected = { username: 'username_1', password: 'password_1' };

            component.tryLogin();
            const argument = matDialogStub.open.getCall(0).args[1];
            const callback = argument.data.callback;

            await callback(expected);

            sinonExpect.calledOnce(userLoginStub.login);
            sinonExpect.calledWith(userLoginStub.login, expected);
        });

        it('should set user data after login attempt', async () => {

            const expected = { id: 1, name: 'name_1' };
            userLoginStub.login.returns(Promise.resolve(expected));

            component.tryLogin();
            const argument = matDialogStub.open.getCall(0).args[1];
            const callback = argument.data.callback;

            await callback({});

            expect(component.user).to.deep.equal(expected);
        });
    });

    describe('logout()', () => {

        it('should use login service to log out', () => {

            component.logout();

            sinonExpect.calledOnce(userLoginStub.logout);
        });
    });
});
