import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { assert as sinonExpect, SinonFakeTimers, useFakeTimers } from 'sinon';
import { expect } from 'chai';

import { SharedModule } from '../../../shared/shared.module';
import { GameHttpService } from '../../../core/services/http/game-http/game-http.service';
import { ChannelService } from '../channel.service';
import { BookmarkManager } from '../../../core/upgraded-providers/bookmark-manager-provider/bookmark-manager-provider';
import { $stateParams } from '../../../core/upgraded-providers/$stateParams-provider/$stateParams-provider';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';
import { stubGameHttpService } from '../../../testing/stubs/custom/game-http.service.stub';
import { stubChannelService } from '../../../testing/stubs/custom/channel.service.stub';
import { stubBookmarkManagerService } from '../../../testing/stubs/custom/bookmark-manager.service.stub';
import { stubViewHistoryManagerService } from '../../../testing/stubs/custom/view-history-manager.service.stub';
import { ChannelCardComponent } from '../channel-card/channel-card.component';

import { GameChannelListComponent } from './game-channel-list.component';

@Component({ selector: 'game-card', template: '<div></div>' })
class GameCardComponentForTest { @Input() public game: any; }

context('game channel list component unit test', () => {

    let timer: SinonFakeTimers;
    let fixture: ComponentFixture<GameChannelListComponent>;
    let component: GameChannelListComponent;

    let gameHttpStub;
    let channelServiceStub;
    let bookmarkManagerStub;
    let $stateParamsStub;
    let viewHistoryManagerStub;

    beforeEach('stubs setup', () => {

        gameHttpStub = stubGameHttpService();
        channelServiceStub = stubChannelService();
        bookmarkManagerStub = stubBookmarkManagerService();
        viewHistoryManagerStub = stubViewHistoryManagerService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule],
            declarations: [

                GameCardComponentForTest,
                ChannelCardComponent,
                GameChannelListComponent
            ],
            providers: [

                { provide: GameHttpService, useValue: gameHttpStub },
                { provide: ChannelService, useValue: channelServiceStub },
                { provide: BookmarkManager, useValue: bookmarkManagerStub },
                { provide: $stateParams, useValue: {} },
                { provide: ViewHistoryManagerService, useValue: viewHistoryManagerStub }
            ]
        });

        fixture = TestBed.createComponent(GameChannelListComponent);
        component = fixture.componentInstance;
        gameHttpStub = TestBed.get(GameHttpService);
        channelServiceStub = TestBed.get(ChannelService);
        bookmarkManagerStub = TestBed.get(BookmarkManager);
        $stateParamsStub = TestBed.get($stateParams);
        viewHistoryManagerStub = TestBed.get(ViewHistoryManagerService);
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(GameChannelListComponent);
    });

    describe('ngOnInit()', () => {

        const gameId = 17;
        const name = 'some-game-5';
        let game;
        let channels;

        beforeEach('ngOnInit() test setup', () => {

            game = { id: gameId };
            channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            $stateParamsStub.name = name;
            $stateParamsStub.channels = channels;
            gameHttpStub.getGameByName.resolves(game);
        });

        it('should set name value with all dashes removed', () => {

            fixture.detectChanges();

            expect(component.name).to.equal('some game 5');
        });

        it('should always load game data', fakeAsync(() => {

            fixture.detectChanges();
            component.ngOnDestroy();
            tick();

            expect(component.game).to.deep.equal(game);
            sinonExpect.calledOnce(gameHttpStub.getGameByName);
            sinonExpect.calledWith(gameHttpStub.getGameByName, component.name);
        }));

        it('should load data from state parameters when channels data exist', fakeAsync(() => {

            fixture.detectChanges();
            component.ngOnDestroy();
            tick();

            expect(component.channels).to.deep.equal(channels);
            sinonExpect.notCalled(channelServiceStub.loadGameChannels);
        }));

        it('should fetch game channels from channel service when channel data is missing from state parameters', fakeAsync(() => {

            const expected = gameId;
            $stateParamsStub.channels = null;

            fixture.detectChanges();
            component.ngOnDestroy();
            tick();

            sinonExpect.calledOnce(channelServiceStub.loadGameChannels);
            sinonExpect.calledWith(channelServiceStub.loadGameChannels, [], expected);
        }));

        it('should not load game channels when no game data found', fakeAsync(() => {

            $stateParamsStub.channels = null;
            gameHttpStub.getGameByName.resolves(null);

            fixture.detectChanges();
            component.ngOnDestroy();
            tick();

            sinonExpect.notCalled(channelServiceStub.loadGameChannels);
        }));

        it('should not load game channels when failed to load game data', fakeAsync(() => {

            $stateParamsStub.channels = null;
            gameHttpStub.getGameByName.rejects(new Error());

            fixture.detectChanges();
            component.ngOnDestroy();
            tick();

            sinonExpect.notCalled(channelServiceStub.loadGameChannels);
        }));

        it('should load channels every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);
            timer = useFakeTimers();
            component.game = game;

            fixture.detectChanges();
            // reset initial call to load channels
            channelServiceStub.loadGameChannels.resetHistory();
            timer.tick(seconds * 1000);
            timer.restore();

            sinonExpect.callCount(channelServiceStub.loadGameChannels, expected);
        });

        it('should not load channels every 10 seconds when game is null', () => {

            timer = useFakeTimers();
            component.game = null;

            fixture.detectChanges();
            // reset initial call to load channels
            channelServiceStub.loadGameChannels.resetHistory();
            timer.tick(60 * 1000);
            timer.restore();

            sinonExpect.notCalled(channelServiceStub.loadGameChannels);
        });
    });

    describe('$onDestroy()', () => {

        it('should cancel interval', () => {

            $stateParamsStub.name = 'some-game-5';
            $stateParamsStub.channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            gameHttpStub.getGameByName.resolves({ id: 17 });

            timer = useFakeTimers();
            fixture.detectChanges();
            // reset initial call to load channels
            gameHttpStub.getGameByName.resetHistory();
            channelServiceStub.loadGameChannels.resetHistory();
            timer.tick(60 * 1000);

            sinonExpect.notCalled(channelServiceStub.loadGameChannels);
            timer.restore();
        });
    });

    describe('isFollowed()', () => {

        it('should use bookmark manager service to check channel status', () => {

            const expected = { channel_id: 5 };

            const result = component.isFollowed(expected);

            expect(result).to.be.true;
            sinonExpect.calledOnce(bookmarkManagerStub.isFollowed);
            sinonExpect.calledWith(bookmarkManagerStub.isFollowed, expected);
        });
    });

    describe('follow()', () => {

        it('should use bookmark manager service to follow channel', () => {

            const expected = { channel_id: 5 };

            component.follow(expected);

            sinonExpect.calledOnce(bookmarkManagerStub.follow);
            sinonExpect.calledWith(bookmarkManagerStub.follow, expected);
        });
    });

    describe('unfollow()', () => {

        it('should use bookmark manager service to unfollow channel', () => {

            const expected = { channel_id: 5 };

            component.unfollow(expected);

            sinonExpect.calledOnce(bookmarkManagerStub.unfollow);
            sinonExpect.calledWith(bookmarkManagerStub.unfollow, expected);
        });
    });

    describe('addHistory()', () => {

        it('should use view history manager service to add view history', () => {

            const expected = { channel_id: 5 };

            component.addHistory(expected);

            sinonExpect.calledOnce(viewHistoryManagerStub.addHistory);
            sinonExpect.calledWith(viewHistoryManagerStub.addHistory, expected);
        });
    });
});
