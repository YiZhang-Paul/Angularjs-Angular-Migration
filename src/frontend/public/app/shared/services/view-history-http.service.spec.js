import SharedModule from '../shared.module';

import { hasAuthenticationToken } from '../utilities/test-utilities/test-verifications';

const mockModule = angular.mock.module;

context('view history http service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/user/histories';

    let q;
    let httpBackend;
    let service;

    beforeEach(mockModule(SharedModule));

    beforeEach('test setup', inject($injector => {

        q = $injector.get('$q');
        httpBackend = $injector.get('$httpBackend');
        service = $injector.get('viewHistoryHttpService');
    }));

    afterEach('test teardown', () => {

        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getHistories()', () => {

        it('should send GET request to correct url', () => {

            const expected = api;
            httpBackend.expectGET(expected).respond([]);

            service.getHistories();

            httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            httpBackend.expectGET(/.*/, hasAuthenticationToken).respond([]);

            service.getHistories();

            httpBackend.flush();
        });

        it('should return view histories found sorted by timestamp in descending order', () => {

            const histories = [{ timestamp: 2 }, { timestamp: 4 }, { timestamp: 6 }];
            const expected = histories.slice().reverse();
            httpBackend.expectGET(/.*/).respond(histories);

            service.getHistories().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            httpBackend.flush();
        });

        it('should return empty collection when no view history found', () => {

            httpBackend.expectGET(/.*/).respond([]);

            service.getHistories().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            httpBackend.flush();
        });

        it('should throw error when http request failed', () => {

            const expected = 400;
            httpBackend.expectGET(/.*/).respond(expected);

            service.getHistories()
                .then(() => q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            httpBackend.flush();
        });
    });

    describe('deleteHistory()', () => {

        const id = 52;

        it('should send DELETE request to correct url', () => {

            const expected = `${api}/${id}`;
            httpBackend.expectDELETE(expected).respond([]);

            service.deleteHistory(id);

            httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            httpBackend.expectDELETE(/.*/, hasAuthenticationToken).respond([]);

            service.deleteHistory(id);

            httpBackend.flush();
        });

        it('should return server response on success', () => {

            const expected = { status: 200, data: 'random_data' };
            httpBackend.expectDELETE(/.*/).respond(expected);

            service.deleteHistory(id).then(result => {

                expect(result).to.deep.equal(expected);
            });

            httpBackend.flush();
        });

        it('should throw error when http request failed', () => {

            const expected = 400;
            httpBackend.expectDELETE(/.*/).respond(expected);

            service.deleteHistory(id)
                .then(() => q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            httpBackend.flush();
        });
    });

    describe('deleteHistories()', () => {

        it('should send DELETE request to correct url', () => {

            const expected = api;
            httpBackend.expectDELETE(expected).respond([]);

            service.deleteHistories();

            httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            httpBackend.expectDELETE(/.*/, hasAuthenticationToken).respond([]);

            service.deleteHistories();

            httpBackend.flush();
        });

        it('should return server response on success', () => {

            const expected = { status: 200, data: 'random_data' };
            httpBackend.expectDELETE(/.*/).respond(expected);

            service.deleteHistories().then(result => {

                expect(result).to.deep.equal(expected);
            });

            httpBackend.flush();
        });

        it('should throw error when http request failed', () => {

            const expected = 400;
            httpBackend.expectDELETE(/.*/).respond(expected);

            service.deleteHistories()
                .then(() => q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            httpBackend.flush();
        });
    });
});
