import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;

context('game service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/games';
    let httpBackend;
    let service;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('test setup', inject(($injector) => {

        httpBackend = $injector.get('$httpBackend');
        service = $injector.get('gameService');
    }));

    afterEach('test teardown', () => {

        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getGame()', () => {

        it('should send GET request to correct url', () => {

            const id = 17;
            const expected = `${api}/${id}`;
            httpBackend.expectGET(expected).respond([]);

            service.getGame(id);

            httpBackend.flush();
        });

        it('should return first data in response collection', () => {

            const id = 17;
            const url = `${api}/${id}`;
            const expected = { name: 'Paul' };
            httpBackend.expectGET(url).respond([expected]);

            service.getGame(id).then(result => {

                expect(result).to.deep.equal(expected);
            });

            httpBackend.flush();
        });

        it('should return null when no game found');

        it('should throw error when request failed');
    });

    describe('getGames()', () => {

        it('should send GET request to correct url');

        it('should return all data found');

        it('should return empty collection when no game found');

        it('should throw error when request failed');
    });
});
