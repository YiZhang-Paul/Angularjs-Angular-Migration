import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';
// import { assert as sinonExpect, stub } from 'sinon';

import { ComponentsModule } from '../components.module';
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

            imports: [ComponentsModule],

            providers: [

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
});
