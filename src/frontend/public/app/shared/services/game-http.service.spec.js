import SharedModule from '../shared.module';

const mockModule = angular.mock.module;

context('game http service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/games';

    let q;
    let httpBackend;
    let service;

    beforeEach(mockModule(SharedModule));

    beforeEach('test setup', inject($injector => {

        q = $injector.get('$q');
        httpBackend = $injector.get('$httpBackend');
        service = $injector.get('gameHttpService');
    }));

    afterEach('test teardown', () => {

        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getGame()', () => {

        const id = 17;

        it('should send GET request to correct url', () => {

            const expected = `${api}/${id}`;
            httpBackend.expectGET(expected).respond([]);

            service.getGame(id);

            httpBackend.flush();
        });

        it('should return first data in response collection', () => {

            const expected = { data: 'random_data' };
            httpBackend.expectGET(/.*/).respond([expected]);

            service.getGame(id).then(result => {

                expect(result).to.deep.equal(expected);
            });

            httpBackend.flush();
        });

        it('should return null when no game found', () => {

            httpBackend.expectGET(/.*/).respond([]);

            service.getGame(id).then(result => {

                expect(result).to.be.null;
            });

            httpBackend.flush();
        });

        it('should throw error when request failed', () => {

            const expected = 400;
            httpBackend.expectGET(/.*/).respond(expected);

            service.getGame(id)
                .then(() => q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            httpBackend.flush();
        });
    });

    describe('getGames()', () => {

        it('should send GET request to correct url', () => {

            const expected = api;
            httpBackend.expectGET(expected).respond([]);

            service.getGames();

            httpBackend.flush();
        });

        it('should return all data found', () => {

            const expected = [{ data: 'data_1' }, { data: 'data_2' }];
            httpBackend.expectGET(/.*/).respond(expected);

            service.getGames().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            httpBackend.flush();
        });

        it('should return empty collection when no game found', () => {

            httpBackend.expectGET(/.*/).respond([]);

            service.getGames().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            httpBackend.flush();
        });

        it('should throw error when request failed', () => {

            const expected = 400;
            httpBackend.expectGET(/.*/).respond(expected);

            service.getGames()
                .then(() => q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            httpBackend.flush();
        });
    });
});