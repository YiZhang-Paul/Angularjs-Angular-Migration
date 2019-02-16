import CoreModule from '../../../core.module.ajs';

const module = angular.mock.module;

context('channel http service unit test', () => {

    const channelApi = 'http://127.0.0.1:4150/api/v1/channels';
    const gameChannelApi = 'http://127.0.0.1:4150/api/v1/games';

    let $q;
    let $httpBackend;
    let service;

    beforeEach(module(CoreModule));

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $httpBackend = $injector.get('$httpBackend');
        service = $injector.get('channelHttpService');
    }));

    afterEach('general test teardown', () => {

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getChannels()', () => {

        it('should send GET request to correct url', () => {

            const expected = channelApi;
            $httpBackend.expectGET(expected).respond([]);

            service.getChannels();

            $httpBackend.flush();
        });

        it('should return all data found', () => {

            const expected = [{ data: 'data_1' }, { data: 'data_2' }];
            $httpBackend.expectGET(/.*/).respond(expected);

            service.getChannels().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $httpBackend.flush();
        });

        it('should return empty collection when no channel found', () => {

            $httpBackend.expectGET(/.*/).respond([]);

            service.getChannels().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $httpBackend.flush();
        });

        it('should throw error when request failed', () => {

            const expected = 400;
            $httpBackend.expectGET(/.*/).respond(expected);

            service.getChannels()
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });

    describe('getChannelsByGameId()', () => {

        const id = 92;

        it('should send GET request to correct url', () => {

            const expected = `${gameChannelApi}/${id}/channels`;
            $httpBackend.expectGET(expected).respond([]);

            service.getChannelsByGameId(id);

            $httpBackend.flush();
        });

        it('should return all data found', () => {

            const expected = [{ data: 'data_1' }, { data: 'data_2' }];
            $httpBackend.expectGET(/.*/).respond(expected);

            service.getChannelsByGameId(id).then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $httpBackend.flush();
        });

        it('should return empty collection when no channel found', () => {

            $httpBackend.expectGET(/.*/).respond([]);

            service.getChannelsByGameId(id).then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $httpBackend.flush();
        });

        it('should throw error when request failed', () => {

            const expected = 400;
            $httpBackend.expectGET(/.*/).respond(expected);

            service.getChannelsByGameId(id)
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });
});
