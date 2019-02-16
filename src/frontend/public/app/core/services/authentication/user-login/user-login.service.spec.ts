import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { assert as sinonExpect } from 'sinon';

import { $mdPanel } from '../../../upgraded-providers/$mdPanel-provider/$mdPanel-provider';
import { $rootScope } from '../../../upgraded-providers/$rootScope-provider/$rootScope-provider';
import { Authenticator } from '../../../upgraded-providers/authenticator-provider/authenticator-provider';
import { UserHttpService } from '../../http/user-http/user-http.service';
import { stub$mdPanel } from '../../../../testing/stubs/built-in/$md-panel.stub.js';
import { stub$rootScope } from '../../../../testing/stubs/built-in/$root-scope.stub.js';
import { stubAuthenticatorService } from '../../../../testing/stubs/custom/authenticator.service.stub.js';
import { stubUserHttpService } from '../../../../testing/stubs/custom/user-http.service.stub';

import { UserLoginService } from './user-login.service';

context('user login service unit test', () => {

    let service: UserLoginService;

    let $mdPanelStub;
    let $rootScopeStub;
    let authenticatorServiceStub;
    let userHttpServiceStub;

    beforeEach('stubs setup', () => {

        $mdPanelStub = stub$mdPanel();
        $rootScopeStub = stub$rootScope();
        authenticatorServiceStub = stubAuthenticatorService();
        userHttpServiceStub = stubUserHttpService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [

                UserLoginService,
                { provide: $mdPanel, useValue: $mdPanelStub },
                { provide: $rootScope, useValue: $rootScopeStub },
                { provide: Authenticator, useValue: authenticatorServiceStub },
                { provide: UserHttpService, useValue: userHttpServiceStub }
            ]
        });

        service = TestBed.get(UserLoginService);
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(UserLoginService);
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
