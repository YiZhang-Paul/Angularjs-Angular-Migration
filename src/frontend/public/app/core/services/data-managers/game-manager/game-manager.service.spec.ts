import { TestBed } from '@angular/core/testing';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { GameHttpService } from '../../http/game-http/game-http.service';
import { stubGameHttpService } from '../../../../testing/stubs/custom/game-http.service.stub';

import { GameManagerService } from './game-manager.service';

context('game manager service unit test', () => {

    let service: GameManagerService;

    let gameHttpStub: any;

    beforeEach('stubs setup', () => {

        gameHttpStub = stubGameHttpService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [

                GameManagerService,
                { provide: GameHttpService, useValue: gameHttpStub }
            ]
        });

        service = TestBed.get(GameManagerService);
        gameHttpStub = TestBed.get(GameHttpService);
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(GameManagerService);
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

            sinonExpect.calledOnce(gameHttpStub.getGames);
        });

        it('should overwrite old game data when new game data is from different game', async () => {

            const expected = [

                service.games[0],
                service.games[1],
                { id: 4, view_count: 8 }
            ];

            gameHttpStub.getGames.resolves(expected);

            await service.cacheGames();

            expect(service.games).to.deep.equal(expected);
        });

        it('should update old game details when new game data is from same game', async () => {

            const expected = [

                service.games[0],
                service.games[1],
                { id: service.games[2].id, view_count: 342 }
            ];

            gameHttpStub.getGames.resolves(expected);

            await service.cacheGames();

            expect(service.games).to.deep.equal(expected);
        });

        it('should include all new games when they are more than total number of old games', async () => {

            const newGame = { id: 5, view_count: 9 };
            const expected = [...service.games, newGame];
            gameHttpStub.getGames.resolves(expected);

            await service.cacheGames();

            expect(service.games).to.deep.equal(expected);
        });

        it('should keep old games when they are more than total number of new games', async () => {

            const expected = service.games.slice();
            const newGames = service.games.slice(0, 1);
            gameHttpStub.getGames.resolves(newGames);

            await service.cacheGames();

            expect(service.games).to.deep.equal(expected);
        });

        it('should not throw error when failed to fetch games', async () => {

            gameHttpStub.getGames.rejects(new Error());

            await service.cacheGames();
        });
    });
});
