import CoreModule from '../../../core.module.ajs';

const module = angular.mock.module;

context('authenticator service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/authenticate';

    let $q;
    let $httpBackend;
    let service;

    beforeEach(module(CoreModule));

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $httpBackend = $injector.get('$httpBackend');
        service = $injector.get('authenticatorService');
    }));

    beforeEach('mock http backend setup', () => {

        $httpBackend.whenPOST(/.*/).respond({});
    });

    afterEach('general test teardown', () => {

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('token', () => {

        it('should return JWT token', () => {

            service

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

            service._header = 'xxx';
            service._payload = 'xxxx';
            service._signature = 'xxx';
        });

        it('should return true when all JWT data is present', () => {

            expect(service.isAuthenticated).to.be.true;
        });

        it('should return false when JWT header is missing', () => {

            service._header = '';

            expect(service.isAuthenticated).to.be.false;
        });

        it('should return false when JWT payload is missing', () => {

            service._payload = '';

            expect(service.isAuthenticated).to.be.false;
        });

        it('should return false when JWT signature is missing', () => {

            service._signature = '';

            expect(service.isAuthenticated).to.be.false;
        });
    });

    describe('requestToken()', () => {

        const token = 'aaa.bbbb.ccc';

        it('should send POST request to correct url', () => {

            const expected = api;
            $httpBackend.expectPOST(expected).respond({ token });

            service.requestToken({});

            $httpBackend.flush();
        });

        it('should send data along with request', () => {

            const username = 'username_1';
            const password = 'password_1';
            const expected = { username, password };
            $httpBackend.expectPOST(/.*/, expected).respond({ token });

            service.requestToken(username, password);

            $httpBackend.flush();
        });

        it('should store JWT data on success', () => {

            const expected = token;
            $httpBackend.expectPOST(/.*/).respond({ token: expected });

            service.requestToken({});

            $httpBackend.flush();

            expect(service.token).to.equal(expected);
        });

        it('should throw error when http request failed', () => {

            const expected = 401;
            $httpBackend.expectPOST(/.*/).respond(expected);

            service.requestToken({})
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });

    describe('clearToken()', () => {

        it('should clear all token data', () => {

            service._header = 'xxx';
            service._payload = 'xxxx';
            service._signature = 'xxx';

            service.clearToken();

            expect(service._header).to.be.empty;
            expect(service._payload).to.be.empty;
            expect(service._signature).to.be.empty;
        });
    });
});
