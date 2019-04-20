import { ComponentFixture, TestBed } from '@angular/core/testing';
import { assert as sinonExpect, SinonFakeTimers, useFakeTimers } from 'sinon';
import { expect } from 'chai';

import { GameModule } from '../game.module';
import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';
import { GameManagerService } from '../../../core/services/data-managers/game-manager/game-manager.service';
import { stubCustomRoutingService } from '../../../testing/stubs/custom/custom-routing.service.stub';
import { stubGameManagerService } from '../../../testing/stubs/custom/game-manager.service.stub';

import { GameListComponent } from './game-list.component';

context('game list component unit test', () => {

    let timer: SinonFakeTimers;
    let fixture: ComponentFixture<GameListComponent>;
    let component: GameListComponent;

    let customRoutingStub;
    let gameManagerStub;

    beforeEach('stubs setup', () => {

        customRoutingStub = stubCustomRoutingService();
        gameManagerStub = stubGameManagerService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [GameModule],
            providers: [

                { provide: CustomRoutingService, useValue: customRoutingStub },
                { provide: GameManagerService, useValue: gameManagerStub }
            ]
        });

        timer = useFakeTimers();
        fixture = TestBed.createComponent(GameListComponent);
        component = fixture.componentInstance;
        customRoutingStub = TestBed.get(CustomRoutingService);
        gameManagerStub = TestBed.get(GameManagerService);
    });

    afterEach('test teardown', () => {

        timer.restore();
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(GameListComponent);
    });

    describe('ngOnInit()', () => {

        it('should cache games on initialization', () => {

            fixture.detectChanges();

            sinonExpect.calledOnce(gameManagerStub.cacheGames);
        });

        it('should cache games every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            fixture.detectChanges();
            // reset initial call to cache games
            gameManagerStub.cacheGames.resetHistory();
            timer.tick(seconds * 1000);

            sinonExpect.callCount(gameManagerStub.cacheGames, expected);
        });
    });

    describe('ngOnDestroy()', () => {

        it('should cancel interval', () => {

            fixture.detectChanges();
            component.ngOnDestroy();
            // reset initial call to cache games
            gameManagerStub.cacheGames.resetHistory();
            timer.tick(60 * 1000);

            sinonExpect.notCalled(gameManagerStub.cacheGames);
        });
    });

    describe('games', () => {

        it('should reference cache from game manager service', () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            gameManagerStub.games = expected;

            expect(component.games).to.deep.equal(expected);
        });
    });

    describe('toChannelsView()', () => {

        it('should use custom routing service to change route', () => {

            const expected = 17;

            component.toChannelsView({ id: expected });

            sinonExpect.calledOnce(customRoutingStub.toChannelsView);
            sinonExpect.calledWith(customRoutingStub.toChannelsView, expected);
        });
    });
});
