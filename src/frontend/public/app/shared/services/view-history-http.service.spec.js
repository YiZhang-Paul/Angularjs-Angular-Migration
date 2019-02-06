import SharedModule from '../shared.module';

import { mockAuthenticatorService } from '../../../testing/stubs/authenticator.service.stub';
import { hasAuthenticationToken } from '../utilities/test-verifications';

const mockModule = angular.mock.module;

context('view history http service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/user/histories';

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
        service = $injector.get('viewHistoryHttpService');
    }));

    afterEach('general test teardown', () => {

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getHistories()', () => {

        it('should send GET request to correct url', () => {

            const expected = api;
            $httpBackend.expectGET(expected).respond([]);

            service.getHistories();

            $httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            $httpBackend.expectGET(/.*/, hasAuthenticationToken).respond([]);

            service.getHistories();

            $httpBackend.flush();
        });

        it('should return view histories found sorted by timestamp in descending order', () => {

            const histories = [{ timestamp: 2 }, { timestamp: 4 }, { timestamp: 6 }];
            const expected = histories.slice().reverse();
            $httpBackend.expectGET(/.*/).respond(histories);

            service.getHistories().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $httpBackend.flush();
        });

        it('should return empty collection when no view history found', () => {

            $httpBackend.expectGET(/.*/).respond([]);

            service.getHistories().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $httpBackend.flush();
        });

        it('should throw error when http request failed', () => {

            const expected = 400;
            $httpBackend.expectGET(/.*/).respond(expected);

            service.getHistories()
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });

    describe('addHistory()', () => {

        it('should send POST request to correct url', () => {

            const expected = api;
            $httpBackend.expectPOST(expected).respond({});

            service.addHistory({});

            $httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            const data = {};
            $httpBackend.expectPOST(/.*/, data, hasAuthenticationToken).respond({});

            service.addHistory(data);

            $httpBackend.flush();
        });

        it('should send data along with request', () => {

            const data = {

                provider_id: 1,
                provider_channel_id: 5,
                provider_game_name: 'random_name'
            };

            const name = data.provider_game_name;
            const expected = Object.assign({ game_name: name }, data);
            $httpBackend.expectPOST(/.*/, expected).respond({});

            service.addHistory(data);

            $httpBackend.flush();
        });

        it('should return server response on success', () => {

            const expected = { status: 200, data: 'random_data' };
            $httpBackend.expectPOST(/.*/).respond(expected);

            service.addHistory({}).then(result => {

                expect(result).to.deep.equal(expected);
            });

            $httpBackend.flush();
        });

        it('should throw error when http request failed', () => {

            const expected = 400;
            $httpBackend.expectPOST(/.*/).respond(expected);

            service.addHistory({})
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });

    describe('deleteHistory()', () => {

        const id = 52;

        it('should send DELETE request to correct url', () => {

            const expected = `${api}/${id}`;
            $httpBackend.expectDELETE(expected).respond([]);

            service.deleteHistory(id);

            $httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            $httpBackend.expectDELETE(/.*/, hasAuthenticationToken).respond([]);

            service.deleteHistory(id);

            $httpBackend.flush();
        });

        it('should return server response on success', () => {

            const expected = { status: 200, data: 'random_data' };
            $httpBackend.expectDELETE(/.*/).respond(expected);

            service.deleteHistory(id).then(result => {

                expect(result).to.deep.equal(expected);
            });

            $httpBackend.flush();
        });

        it('should throw error when http request failed', () => {

            const expected = 400;
            $httpBackend.expectDELETE(/.*/).respond(expected);

            service.deleteHistory(id)
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });

    describe('deleteHistories()', () => {

        it('should send DELETE request to correct url', () => {

            const expected = api;
            $httpBackend.expectDELETE(expected).respond([]);

            service.deleteHistories();

            $httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            $httpBackend.expectDELETE(/.*/, hasAuthenticationToken).respond([]);

            service.deleteHistories();

            $httpBackend.flush();
        });

        it('should return server response on success', () => {

            const expected = { status: 200, data: 'random_data' };
            $httpBackend.expectDELETE(/.*/).respond(expected);

            service.deleteHistories().then(result => {

                expect(result).to.deep.equal(expected);
            });

            $httpBackend.flush();
        });

        it('should throw error when http request failed', () => {

            const expected = 400;
            $httpBackend.expectDELETE(/.*/).respond(expected);

            service.deleteHistories()
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });
});
