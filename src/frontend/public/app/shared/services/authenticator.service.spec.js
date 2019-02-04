import SharedModule from '../shared.module';

const mockModule = angular.mock.module;

context('authenticator service unit test', () => {

    let service;

    beforeEach(mockModule(SharedModule));

    beforeEach('general test setup', inject($injector => {

        service = $injector.get('authenticatorService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('token', () => {

        it('should return JWT token', () => {

            const regex = new RegExp(/^\w+\.\w+\.\w+$/);

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
});
