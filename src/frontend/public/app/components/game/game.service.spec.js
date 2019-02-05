import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;

context('game service unit test', () => {

    let service;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('general test setup', inject($injector => {

        service = $injector.get('gameService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('syncGames()', () => {

        let oldGames;

        beforeEach('syncGames() test setup', () => {

            oldGames = [

                { id: 0, view_count: 1 },
                { id: 1, view_count: 4 },
                { id: 2, view_count: 7 }
            ];
        });

        it('should overwrite old game data when new game data is from different game', () => {

            const expected = [

                oldGames[0],
                oldGames[1],
                { id: 4, view_count: 8 }
            ];

            service.syncGames(oldGames, expected);

            expect(oldGames).to.deep.equal(expected);
        });

        it('should update old game details when new game data is from same game', () => {

            const expected = [

                oldGames[0],
                oldGames[1],
                { id: oldGames[2].id, view_count: 342 }
            ];

            service.syncGames(oldGames, expected);

            expect(oldGames).to.deep.equal(expected);
        });

        it('should include all new games when they are more than total number of old games', () => {

            const newGame = { id: 5, view_count: 9 };
            const expected = [...oldGames, newGame];

            service.syncGames(oldGames, expected);

            expect(oldGames).to.deep.equal(expected);
        });

        it('should keep old games when they are more than total number of new games', () => {

            const expected = oldGames.slice();
            const newGames = oldGames.slice(0, 1);

            service.syncGames(oldGames, newGames);

            expect(oldGames).to.deep.equal(expected);
        });
    });
});
