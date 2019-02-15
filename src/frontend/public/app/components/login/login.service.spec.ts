import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { assert as sinonExpect } from 'sinon';

import { $mdPanel } from '../../shared/upgraded-providers/$mdPanel.provider';
import { $rootScope } from '../../shared/upgraded-providers/$rootScope.provider';
import { Authenticator } from '../../shared/upgraded-providers/authenticator.provider';
import { UserHttpService } from '../../shared/services/user-http.service';
import { mock$mdPanel } from '../../../testing/stubs/$md-panel.stub.js';
import { mock$rootScope } from '../../../testing/stubs/$root-scope.stub.js';
import { mockAuthenticatorService } from '../../../testing/stubs/authenticator.service.stub.js';
import { mockUserHttpService } from '../../../testing/stubs/user-http-service.stub';

import { LoginService } from './login.service';

context('login service unit test', () => {

    let service: LoginService;

    let $mdPanelStub;
    let $rootScopeStub;
    let authenticatorServiceStub;
    let userHttpServiceStub;

    beforeEach('mocks setup', () => {

        $mdPanelStub = mock$mdPanel();
        $mdPanelStub.setupMock();

        $rootScopeStub = mock$rootScope();
        $rootScopeStub.setupMock();

        authenticatorServiceStub = mockAuthenticatorService();
        authenticatorServiceStub.setupMock();

        userHttpServiceStub = mockUserHttpService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [

                LoginService,
                { provide: $mdPanel, useValue: $mdPanelStub },
                { provide: $rootScope, useValue: $rootScopeStub },
                { provide: Authenticator, useValue: authenticatorServiceStub },
                { provide: UserHttpService, useValue: userHttpServiceStub }
            ]
        });

        service = TestBed.get(LoginService);
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(LoginService);
    });

    describe('login()', () => {

        it('should use authenticator service to request access token', () => {

            const expected = { username: 'username_1', password: 'password_1' };

            service.login(expected);

            sinonExpect.calledOnce(authenticatorServiceStub.requestToken);
            sinonExpect.calledWith(authenticatorServiceStub.requestToken, expected.username, expected.password);
        });

        it('should raise user authenticated event on successful login', async () => {

            await service.login({});

            sinonExpect.calledOnce($rootScopeStub.$broadcast);
            sinonExpect.calledWith($rootScopeStub.$broadcast, 'userAuthenticated');
        });

        it('should throw error when login failed', async () => {

            const expected = { status: 400 };
            authenticatorServiceStub.requestToken.returns(Promise.reject(expected));

            await service.login({}).catch(result => {

                expect(result).to.deep.equal(expected);
            });
        });

        it('should fetch user data using user http service on successful login', async () => {

            const expected = { id: 1, name: 'name_1' };
            userHttpServiceStub.getUser.returns(Promise.resolve(expected));

            const result = await service.login({});

            expect(result).to.deep.equal(expected);
            sinonExpect.calledOnce(userHttpServiceStub.getUser);
        });

        it('should set user to null when failed to fetch user data', async () => {

            userHttpServiceStub.getUser.returns(Promise.reject(new Error()));

            const result = await service.login({});

            expect(result).to.be.null;
        });
    });

    describe('logout()', () => {

        it('should use authenticator service to clear access token', () => {

            service.logout();

            sinonExpect.calledOnce(authenticatorServiceStub.clearToken);
        });

        it('should raise user logged out event', () => {

            service.logout();

            sinonExpect.calledOnce($rootScopeStub.$broadcast);
            sinonExpect.calledWith($rootScopeStub.$broadcast, 'userLoggedOut');
        });
    });

    describe('openLoginPanel()', () => {

        it('should open new $mdPanel', () => {

            service.openLoginPanel(null);

            sinonExpect.calledOnce($mdPanelStub.open);
        });

        it('should set login callback on opened panel', () => {

            const expected = () => true;

            service.openLoginPanel(expected);

            const argument = $mdPanelStub.open.getCall(0).args[0];

            expect(argument.locals.loginCallback).to.deep.equal(expected);
        });
    });
});
