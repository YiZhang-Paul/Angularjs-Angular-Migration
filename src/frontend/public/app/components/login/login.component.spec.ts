import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { assert as sinonExpect } from 'sinon';

import { SharedModule } from '../../shared/shared.module';
import { Authenticator } from '../../shared/upgraded-providers/authenticator.provider';
import { mockAuthenticatorService } from '../../../testing/stubs/authenticator.service.stub.js';
import { mockLoginService } from '../../../testing/stubs/login.service.stub';

import { LoginService } from './login.service';
import { UserWidgetComponent } from './user-widget/user-widget.component';
import { LoginComponent } from './login.component';

context('login component unit test', () => {

    let fixture: ComponentFixture<LoginComponent>;
    let component: LoginComponent;

    let authenticatorServiceStub;
    let loginServiceStub;

    beforeEach('mocks setup', () => {

        authenticatorServiceStub = mockAuthenticatorService();
        loginServiceStub = mockLoginService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule],
            declarations: [UserWidgetComponent, LoginComponent],
            providers: [

                { provide: Authenticator, useValue: authenticatorServiceStub },
                { provide: LoginService, useValue: loginServiceStub }
            ]
        });

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(LoginComponent);
    });

    describe('isAuthenticated', () => {

        it('should use authenticator service to check user authentication status', () => {

            const expected = authenticatorServiceStub.isAuthenticated;

            expect(component.isAuthenticated).to.equal(expected);
        });
    });

    describe('tryLogin()', () => {

        it('should open login panel', () => {

            component.tryLogin();

            sinonExpect.calledOnce(loginServiceStub.openLoginPanel);
        });

        it('should use login service to log in', async () => {

            const expected = { username: 'username_1', password: 'password_1' };

            component.tryLogin();
            const callback = loginServiceStub.openLoginPanel.getCall(0).args[0];

            await callback(expected);

            sinonExpect.calledOnce(loginServiceStub.login);
            sinonExpect.calledWith(loginServiceStub.login, expected);
        });

        it('should set user data after login attempt', async () => {

            const expected = { id: 1, name: 'name_1' };
            loginServiceStub.login.returns(Promise.resolve(expected));

            component.tryLogin();
            const callback = loginServiceStub.openLoginPanel.getCall(0).args[0];

            await callback({});

            expect(component.user).to.deep.equal(expected);
        });
    });

    describe('logout()', () => {

        it('should use login service to log out', () => {

            component.logout();

            sinonExpect.calledOnce(loginServiceStub.logout);
        });
    });
});
