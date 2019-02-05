import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('game service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let getGamesStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock game http service setup', mockModule($provide => {

        getGamesStub = stub();

        $provide.service('gameHttpService', () => ({

            getGames: getGamesStub
        }));
    }));

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('gameService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('cacheGames()', () => {

        beforeEach('cacheGames() test setup', () => {

            service.games = [

                { id: 0, view_count: 1 },
                { id: 1, view_count: 4 },
                { id: 2, view_count: 7 }
            ];
        });

        it('should use game http service to fetch game data', () => {

            getGamesStub.returns($q.resolve([]));

            service.cacheGames();
            $rootScope.$apply();

            sinonExpect.calledOnce(getGamesStub);
        });

        it('should overwrite old game data when new game data is from different game', () => {

            const expected = [

                service.games[0],
                service.games[1],
                { id: 4, view_count: 8 }
            ];

            getGamesStub.returns($q.resolve(expected));

            service.cacheGames();
            $rootScope.$apply();

            expect(service.games).to.deep.equal(expected);
        });

        it('should update old game details when new game data is from same game', () => {

            const expected = [

                service.games[0],
                service.games[1],
                { id: service.games[2].id, view_count: 342 }
            ];

            getGamesStub.returns($q.resolve(expected));

            service.cacheGames();
            $rootScope.$apply();

            expect(service.games).to.deep.equal(expected);
        });

        it('should include all new games when they are more than total number of old games', () => {

            const newGame = { id: 5, view_count: 9 };
            const expected = [...service.games, newGame];
            getGamesStub.returns($q.resolve(expected));

            service.cacheGames();
            $rootScope.$apply();

            expect(service.games).to.deep.equal(expected);
        });

        it('should keep old games when they are more than total number of new games', () => {

            const expected = service.games.slice();
            const newGames = service.games.slice(0, 1);
            getGamesStub.returns($q.resolve(newGames));

            service.cacheGames();
            $rootScope.$apply();

            expect(service.games).to.deep.equal(expected);
        });

        it('should not throw error when failed to fetch games', () => {

            getGamesStub.returns($q.reject(new Error()));

            service.cacheGames();
            $rootScope.$apply();
        });
    });
});
