import SharedModule from '../shared.module';

import { mockAuthenticatorService } from '../../../testing/stubs/authenticator.service.stub';
import { hasAuthenticationToken } from '../utilities/test-verifications';

const mockModule = angular.mock.module;

context('bookmark http service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/user/bookmarks';

    let $q;
    let $httpBackend;
    let service;

    beforeEach(mockModule(SharedModule));

    beforeEach('mocks setup', () => {

        mockAuthenticatorService(mockModule);
    });

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $httpBackend = $injector.get('$httpBackend');
        service = $injector.get('bookmarkHttpService');
    }));

    beforeEach('mock http backend setup', () => {

        $httpBackend.whenGET(/.*/).respond([]);
        $httpBackend.whenPOST(/.*/).respond({});
        $httpBackend.whenDELETE(/.*/).respond({});
    });

    afterEach('general test teardown', () => {

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getBookmarks()', () => {

        it('should send GET request to correct url', () => {

            const expected = api;
            $httpBackend.expectGET(expected).respond([]);

            service.getBookmarks();

            $httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            $httpBackend.expectGET(/.*/, hasAuthenticationToken).respond([]);

            service.getBookmarks();

            $httpBackend.flush();
        });

        it('should return bookmarks found', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            $httpBackend.expectGET(/.*/).respond(expected);

            service.getBookmarks().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $httpBackend.flush();
        });

        it('should return empty collection when no bookmark found', () => {

            $httpBackend.expectGET(/.*/).respond([]);

            service.getBookmarks().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $httpBackend.flush();
        });

        it('should throw error when http request failed', () => {

            const expected = 400;
            $httpBackend.expectGET(/.*/).respond(expected);

            service.getBookmarks()
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });

    describe('addBookmark()', () => {

        it('should send POST request to correct url', () => {

            const expected = api;
            $httpBackend.expectPOST(expected).respond({});

            service.addBookmark({});

            $httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            const data = {};
            $httpBackend.expectPOST(/.*/, data, hasAuthenticationToken).respond({});

            service.addBookmark(data);

            $httpBackend.flush();
        });

        it('should send data along with request', () => {

            const expected = { provider_id: 1, provider_channel_id: 5 };
            $httpBackend.expectPOST(/.*/, expected).respond({});

            service.addBookmark(expected);

            $httpBackend.flush();
        });

        it('should return server response on success', () => {

            const expected = { status: 200, data: 'random_data' };
            $httpBackend.expectPOST(/.*/).respond(expected);

            service.addBookmark({}).then(result => {

                expect(result).to.deep.equal(expected);
            });

            $httpBackend.flush();
        });

        it('should throw error when http request failed', () => {

            const expected = 400;
            $httpBackend.expectPOST(/.*/).respond(expected);

            service.addBookmark({})
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });

    describe('deleteBookmark()', () => {

        const id = 29;

        it('should send DELETE request to correct url', () => {

            const expected = `${api}/${id}`;
            $httpBackend.expectDELETE(expected).respond({});

            service.deleteBookmark(id);

            $httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            $httpBackend.expectDELETE(/.*/, hasAuthenticationToken).respond({});

            service.deleteBookmark(id);

            $httpBackend.flush();
        });

        it('should return server response on success', () => {

            const expected = { status: 200, data: 'random_data' };
            $httpBackend.expectDELETE(/.*/).respond(expected);

            service.deleteBookmark(id).then(result => {

                expect(result).to.deep.equal(expected);
            });

            $httpBackend.flush();
        });

        it('should throw error when http request failed', () => {

            const expected = 400;
            $httpBackend.expectDELETE(/.*/).respond(expected);

            service.deleteBookmark(id)
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });
});
