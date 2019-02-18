import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { Authenticator } from '../../../upgraded-providers/authenticator-provider/authenticator-provider';
import { stubAuthenticatorService } from '../../../../testing/stubs/custom/authenticator.service.stub.js';
import { hasAuthenticationToken } from '../../../../testing/test-verifications/test-verifications.js';

import { UserHttpService } from './user-http.service';

context('user http service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/user';

    let httpController: HttpTestingController;
    let service: UserHttpService;

    let authenticatorStub;

    beforeEach('general test setup', () => {

        authenticatorStub = stubAuthenticatorService();

        TestBed.configureTestingModule({

            imports: [HttpClientTestingModule],

            providers: [

                UserHttpService,
                { provide: Authenticator, useValue: authenticatorStub }
            ]
        });

        httpController = TestBed.get(HttpTestingController);
        service = TestBed.get(UserHttpService);
    });

    afterEach('general test teardown', () => {

        httpController.verify();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(UserHttpService);
    });

    describe('getUser()', () => {

        it('should send GET request to correct url', () => {

            const expectedUrl = api;
            const expectedMethod = 'GET';

            service.getUser();

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should include authentication token in request header', () => {

            service.getUser();

            const request = httpController.expectOne(api).request;
            const key = 'Authorization';
            const header = { [key]: request.headers.get(key) };

            expect(hasAuthenticationToken(header)).to.be.true;
        });

        it('should return user data found', async () => {

            const expected = { id: 1, user_name: 'name_1' };

            const promise = service.getUser();
            httpController.expectOne(api).flush(expected);

            const result = await promise;

            expect(result).to.deep.equal(expected);
        });

        it('should throw error when http request failed', async () => {

            const expected = 400;

            const promise = service.getUser().catch(error => error);
            httpController.expectOne(api).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });
});
