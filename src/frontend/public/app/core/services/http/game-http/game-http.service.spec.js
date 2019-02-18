import CoreModule from '../../../core.module.ajs';

const module = angular.mock.module;

context('game http service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/games';

    let $q;
    let $httpBackend;
    let service;

    beforeEach(module(CoreModule));

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $httpBackend = $injector.get('$httpBackend');
        service = $injector.get('gameHttpService');
    }));

    afterEach('general test teardown', () => {

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getGame()', () => {

        const id = 17;

        it('should send GET request to correct url', () => {

            const expected = `${api}/${id}`;
            $httpBackend.expectGET(expected).respond([]);

            service.getGame(id);

            $httpBackend.flush();
        });

        it('should return first data in response collection', () => {

            const expected = { data: 'random_data' };
            $httpBackend.expectGET(/.*/).respond([expected]);

            service.getGame(id).then(result => {

                expect(result).to.deep.equal(expected);
            });

            $httpBackend.flush();
        });

        it('should return null when no game found', () => {

            $httpBackend.expectGET(/.*/).respond([]);

            service.getGame(id).then(result => {

                expect(result).to.be.null;
            });

            $httpBackend.flush();
        });

        it('should throw error when request failed', () => {

            const expected = 400;
            $httpBackend.expectGET(/.*/).respond(expected);

            service.getGame(id)
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });

    describe('getGameByName()', () => {

        it('should send GET request to correct url', () => {

            const expected = api;
            $httpBackend.expectGET(expected).respond([]);

            service.getGameByName('');

            $httpBackend.flush();
        });

        it('should return game data found', () => {

            const name = 'random game name';
            const games = [{ name: 'name_1' }, { name }, { name: 'name_3' }];
            const expected = name;
            $httpBackend.expectGET(/.*/).respond(games);

            service.getGameByName(name).then(result => {

                expect(result).is.not.null;
                expect(result.name).to.equal(expected);
            });

            $httpBackend.flush();
        });

        it('should return null when game data is not found', () => {

            const name = 'name_2';
            const games = [{ name: 'name_1' }, { name: 'name_3' }];
            $httpBackend.expectGET(/.*/).respond(games);

            service.getGameByName(name).then(result => {

                expect(games.every(_ => _.name !== name)).to.be.true;
                expect(result).is.null;
            });

            $httpBackend.flush();
        });

        it('should throw error when request failed', () => {

            const expected = 400;
            $httpBackend.expectGET(/.*/).respond(expected);

            service.getGameByName('')
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });

    describe('getGames()', () => {

        it('should send GET request to correct url', () => {

            const expected = api;
            $httpBackend.expectGET(expected).respond([]);

            service.getGames();

            $httpBackend.flush();
        });

        it('should return all data found', () => {

            const expected = [{ data: 'data_1' }, { data: 'data_2' }];
            $httpBackend.expectGET(/.*/).respond(expected);

            service.getGames().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $httpBackend.flush();
        });

        it('should return empty collection when no game found', () => {

            $httpBackend.expectGET(/.*/).respond([]);

            service.getGames().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $httpBackend.flush();
        });

        it('should throw error when request failed', () => {

            const expected = 400;
            $httpBackend.expectGET(/.*/).respond(expected);

            service.getGames()
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            $httpBackend.flush();
        });
    });
});
