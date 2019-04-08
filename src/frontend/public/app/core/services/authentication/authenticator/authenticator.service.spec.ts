import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { AuthenticatorService } from './authenticator.service';

context('authenticator service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/authenticate';
    const headerKey = '_header';
    const payloadKey = '_payload';
    const signatureKey = '_signature';

    let httpController: HttpTestingController;
    let service: AuthenticatorService;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [HttpClientTestingModule],
            providers: [AuthenticatorService]
        });

        httpController = TestBed.get(HttpTestingController);
        service = TestBed.get(AuthenticatorService);
    });

    afterEach('general test teardown', () => {

        httpController.verify();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(AuthenticatorService);
    });

    describe('token', () => {

        it('should return JWT token', () => {

            const regex = new RegExp(/^\w*\.\w*\.\w*$/);

            expect(regex.test(service.token)).to.be.true;
        });
    });

    describe('defaultHeaders', () => {

        it('should return default headers with authorization header set', () => {

            const headers = service.defaultHeaders;
            const expected = `bearer ${service.token}`;

            expect(headers.Authorization).to.equal(expected);
        });
    });

    describe('defaultOptions', () => {

        it('should contain default headers', () => {

            const options = service.defaultOptions;

            expect(options.headers).to.deep.equal(service.defaultHeaders);
        });
    });

    describe('isAuthenticated', () => {

        beforeEach('isAuthenticated test setup', () => {

            service[headerKey] = 'xxx';
            service[payloadKey] = 'xxxx';
            service[signatureKey] = 'xxx';
        });

        it('should return true when all JWT data is present', () => {

            expect(service.isAuthenticated).to.be.true;
        });

        it('should return false when JWT header is missing', () => {

            service[headerKey] = '';

            expect(service.isAuthenticated).to.be.false;
        });

        it('should return false when JWT payload is missing', () => {

            service[payloadKey] = '';

            expect(service.isAuthenticated).to.be.false;
        });

        it('should return false when JWT signature is missing', () => {

            service[signatureKey] = '';

            expect(service.isAuthenticated).to.be.false;
        });
    });

    describe('requestToken()', () => {

        const token = 'aaa.bbbb.ccc';

        it('should send POST request to correct url', async () => {

            const expectedUrl = api;
            const expectedMethod = 'POST';

            service.requestToken('', '');
            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should send data along with request', () => {

            const username = 'username_1';
            const password = 'password_1';
            const expected = { username, password };

            service.requestToken(expected.username, expected.password);

            httpController.expectOne(_ => {

                return _.body.username === expected.username &&
                       _.body.password === expected.password;

            }).flush({});
        });

        it('should store JWT data on success', async () => {

            const expected = token;

            const promise = service.requestToken('', '');
            httpController.expectOne(_ => true).flush({ token: expected });

            await promise;

            expect(service.token).to.equal(expected);
        });

        it('should throw error when http request failed', async () => {

            const expected = 401;

            const promise = service.requestToken('', '').catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });

    describe('clearToken()', () => {

        it('should clear all token data', () => {

            service[headerKey] = 'xxx';
            service[payloadKey] = 'xxxx';
            service[signatureKey] = 'xxx';

            service.clearToken();

            expect(service[headerKey]).to.be.empty;
            expect(service[payloadKey]).to.be.empty;
            expect(service[signatureKey]).to.be.empty;
        });
    });
});
