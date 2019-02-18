import CoreModule from '../../../core.module.ajs';

import { stubGameHttpServiceNg1 } from '../../../../testing/stubs/custom/game-http.service.stub';

const module = angular.mock.module;
const sinonExpect = sinon.assert;

context('game manager service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let gameHttpStub;

    beforeEach(module(CoreModule));

    beforeEach('stubs setup', () => {

        gameHttpStub = stubGameHttpServiceNg1(module, inject);

        gameHttpStub.setupStub();
    });

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('gameManagerService');
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

            service.cacheGames();
            $rootScope.$apply();

            sinonExpect.calledOnce(gameHttpStub.getGames);
        });

        it('should overwrite old game data when new game data is from different game', () => {

            const expected = [

                service.games[0],
                service.games[1],
                { id: 4, view_count: 8 }
            ];

            gameHttpStub.getGames.returns($q.resolve(expected));

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

            gameHttpStub.getGames.returns($q.resolve(expected));

            service.cacheGames();
            $rootScope.$apply();

            expect(service.games).to.deep.equal(expected);
        });

        it('should include all new games when they are more than total number of old games', () => {

            const newGame = { id: 5, view_count: 9 };
            const expected = [...service.games, newGame];
            gameHttpStub.getGames.returns($q.resolve(expected));

            service.cacheGames();
            $rootScope.$apply();

            expect(service.games).to.deep.equal(expected);
        });

        it('should keep old games when they are more than total number of new games', () => {

            const expected = service.games.slice();
            const newGames = service.games.slice(0, 1);
            gameHttpStub.getGames.returns($q.resolve(newGames));

            service.cacheGames();
            $rootScope.$apply();

            expect(service.games).to.deep.equal(expected);
        });

        it('should not throw error when failed to fetch games', () => {

            gameHttpStub.getGames.returns($q.reject(new Error()));

            service.cacheGames();
            $rootScope.$apply();
        });
    });
});
