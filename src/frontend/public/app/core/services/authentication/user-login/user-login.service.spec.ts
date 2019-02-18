import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { assert as sinonExpect } from 'sinon';

import { $rootScope } from '../../../upgraded-providers/$rootScope-provider/$rootScope-provider';
import { Authenticator } from '../../../upgraded-providers/authenticator-provider/authenticator-provider';
import { UserHttpService } from '../../http/user-http/user-http.service';
import { stub$rootScope } from '../../../../testing/stubs/built-in/$root-scope.stub.js';
import { stubAuthenticatorService } from '../../../../testing/stubs/custom/authenticator.service.stub.js';
import { stubUserHttpService } from '../../../../testing/stubs/custom/user-http.service.stub';

import { UserLoginService } from './user-login.service';

context('user login service unit test', () => {

    let service: UserLoginService;

    let $rootScopeStub;
    let authenticatorStub;
    let userHttpStub;

    beforeEach('stubs setup', () => {

        $rootScopeStub = stub$rootScope();
        authenticatorStub = stubAuthenticatorService();
        userHttpStub = stubUserHttpService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [

                UserLoginService,
                { provide: $rootScope, useValue: $rootScopeStub },
                { provide: Authenticator, useValue: authenticatorStub },
                { provide: UserHttpService, useValue: userHttpStub }
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

            sinonExpect.calledOnce(authenticatorStub.requestToken);
            sinonExpect.calledWith(authenticatorStub.requestToken, expected.username, expected.password);
        });

        it('should raise user authenticated event on successful login', async () => {

            await service.login({});

            sinonExpect.calledOnce($rootScopeStub.$broadcast);
            sinonExpect.calledWith($rootScopeStub.$broadcast, 'userAuthenticated');
        });

        it('should throw error when login failed', async () => {

            const expected = { status: 400 };
            authenticatorStub.requestToken.returns(Promise.reject(expected));

            await service.login({}).catch(result => {

                expect(result).to.deep.equal(expected);
            });
        });

        it('should fetch user data using user http service on successful login', async () => {

            const expected = { id: 1, name: 'name_1' };
            userHttpStub.getUser.returns(Promise.resolve(expected));

            const result = await service.login({});

            expect(result).to.deep.equal(expected);
            sinonExpect.calledOnce(userHttpStub.getUser);
        });

        it('should set user to null when failed to fetch user data', async () => {

            userHttpStub.getUser.returns(Promise.reject(new Error()));

            const result = await service.login({});

            expect(result).to.be.null;
        });
    });

    describe('logout()', () => {

        it('should use authenticator service to clear access token', () => {

            service.logout();

            sinonExpect.calledOnce(authenticatorStub.clearToken);
        });

        it('should raise user logged out event', () => {

            service.logout();

            sinonExpect.calledOnce($rootScopeStub.$broadcast);
            sinonExpect.calledWith($rootScopeStub.$broadcast, 'userLoggedOut');
        });
    });
});
