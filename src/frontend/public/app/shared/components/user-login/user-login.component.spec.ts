import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { assert as sinonExpect } from 'sinon';

import { SharedModule } from '../../shared.module';
import { $mdPanel } from '../../../core/upgraded-providers/$mdPanel-provider/$mdPanel-provider';
import { Authenticator } from '../../../core/upgraded-providers/authenticator-provider/authenticator-provider';
import { UserLoginService } from '../../../core/services/authentication/user-login/user-login.service';
import { stub$mdPanel } from '../../../testing/stubs/built-in/$md-panel.stub.js';
import { stubAuthenticatorService } from '../../../testing/stubs/custom/authenticator.service.stub.js';
import { stubUserLoginService } from '../../../testing/stubs/custom/user-login.service.stub';

import { UserLoginComponent } from './user-login.component';

context('user login component unit test', () => {

    let fixture: ComponentFixture<UserLoginComponent>;
    let component: UserLoginComponent;

    let $mdPanelStub;
    let authenticatorStub;
    let userLoginStub;

    beforeEach('stubs setup', () => {

        $mdPanelStub = stub$mdPanel();
        authenticatorStub = stubAuthenticatorService();
        userLoginStub = stubUserLoginService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule],
            providers: [

                { provide: $mdPanel, useValue: $mdPanelStub },
                { provide: Authenticator, useValue: authenticatorStub },
                { provide: UserLoginService, useValue: userLoginStub }
            ]
        });

        fixture = TestBed.createComponent(UserLoginComponent);
        component = fixture.componentInstance;
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

            sinonExpect.calledOnce($mdPanelStub.open);
        });

        it('should use login service to log in', async () => {

            const expected = { username: 'username_1', password: 'password_1' };

            component.tryLogin();
            const argument = $mdPanelStub.open.getCall(0).args[0];
            const callback = argument.locals.loginCallback;

            await callback(expected);

            sinonExpect.calledOnce(userLoginStub.login);
            sinonExpect.calledWith(userLoginStub.login, expected);
        });

        it('should set user data after login attempt', async () => {

            const expected = { id: 1, name: 'name_1' };
            userLoginStub.login.returns(Promise.resolve(expected));

            component.tryLogin();
            const argument = $mdPanelStub.open.getCall(0).args[0];
            const callback = argument.locals.loginCallback;

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
