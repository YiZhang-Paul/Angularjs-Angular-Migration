import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { GameManagerService } from '../../../services/data-managers/game-manager/game-manager.service';
import { stubGameManagerService } from '../../../../testing/stubs/custom/game-manager.service.stub';

import { GameFinder } from './game-finder.service';

context('game finder service unit test', () => {

    let service: GameFinder;

    let gameManagerStub;

    beforeEach('stubs setup', () => {

        gameManagerStub = stubGameManagerService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [

                GameFinder,
                { provide: GameManagerService, useValue: gameManagerStub }
            ]
        });

        service = TestBed.get(GameFinder);
        gameManagerStub = TestBed.get(GameManagerService);
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(GameFinder);
    });

    describe('findByName()', () => {

        beforeEach('findByName() test setup', () => {

            gameManagerStub.games = [

                { name: 'game-name-11' },
                { name: 'game-name-32' },
                { name: 'game-name-37' },
                { name: 'game-name-42' },
                { name: '' },
                { name: null },
                { name: 'game-name-51' }
            ];
        });

        it('should return games found', () => {

            const expected = gameManagerStub.games.slice(1, 3);

            const result = service.findByName('gme nam-3');

            expect(result).to.deep.equal(expected);
        });

        it('should return empty collection when search keyword is empty', () => {

            const result = service.findByName('  ');

            expect(result).to.be.instanceOf(Array);
            expect(result).to.be.empty;
        });

        it('should return empty collection when game cache is empty', () => {

            gameManagerStub.games = [];

            const result = service.findByName('game-name');

            expect(result).to.be.instanceOf(Array);
            expect(result).to.be.empty;
        });

        it('should return empty collection when no games found', () => {

            const result = service.findByName('game-name-55');

            expect(result).to.be.instanceOf(Array);
            expect(result).to.be.empty;
        });
    });
});
