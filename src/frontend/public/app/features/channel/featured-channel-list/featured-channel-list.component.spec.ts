import { ComponentFixture, TestBed } from '@angular/core/testing';
import { assert as sinonExpect, SinonFakeTimers, useFakeTimers } from 'sinon';
import { expect } from 'chai';

import { SharedModule } from '../../../shared/shared.module';
import { BookmarkManagerService } from '../../../core/services/data-managers/bookmark-manager/bookmark-manager.service';
import { ChannelService } from '../channel.service';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';
import { stubBookmarkManagerService } from '../../../testing/stubs/custom/bookmark-manager.service.stub';
import { stubChannelService } from '../../../testing/stubs/custom/channel.service.stub';
import { stubViewHistoryManagerService } from '../../../testing/stubs/custom/view-history-manager.service.stub';
import { ChannelCardComponent } from '../channel-card/channel-card.component';

import { FeaturedChannelListComponent } from './featured-channel-list.component';

context('featured channel list component unit test', () => {

    let timer: SinonFakeTimers;
    let fixture: ComponentFixture<FeaturedChannelListComponent>;
    let component: FeaturedChannelListComponent;

    let bookmarkManagerStub;
    let channelServiceStub;
    let viewHistoryManagerStub;

    beforeEach('stubs setup', () => {

        bookmarkManagerStub = stubBookmarkManagerService();
        channelServiceStub = stubChannelService();
        viewHistoryManagerStub = stubViewHistoryManagerService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule],
            declarations: [

                ChannelCardComponent,
                FeaturedChannelListComponent
            ],
            providers: [

                { provide: BookmarkManagerService, useValue: bookmarkManagerStub },
                { provide: ChannelService, useValue: channelServiceStub },
                { provide: ViewHistoryManagerService, useValue: viewHistoryManagerStub }
            ]
        });

        timer = useFakeTimers();
        fixture = TestBed.createComponent(FeaturedChannelListComponent);
        component = fixture.componentInstance;
        bookmarkManagerStub = TestBed.get(BookmarkManagerService);
        channelServiceStub = TestBed.get(ChannelService);
        viewHistoryManagerStub = TestBed.get(ViewHistoryManagerService);
    });

    afterEach('test teardown', () => {

        timer.restore();
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(FeaturedChannelListComponent);
    });

    describe('ngOnInit()', () => {

        it('should use channel service to load channels on initialization', () => {

            fixture.detectChanges();

            sinonExpect.calledOnce(channelServiceStub.loadFeaturedChannels);
        });

        it('should load channels every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            fixture.detectChanges();
            // reset initial call to load channels
            channelServiceStub.loadFeaturedChannels.resetHistory();
            timer.tick(seconds * 1000);

            sinonExpect.callCount(channelServiceStub.loadFeaturedChannels, expected);
        });
    });

    describe('ngOnDestroy()', () => {

        it('should cancel interval', () => {

            fixture.detectChanges();
            component.ngOnDestroy();
            // reset initial call to load channels
            channelServiceStub.loadFeaturedChannels.resetHistory();
            timer.tick(60 * 1000);

            sinonExpect.notCalled(channelServiceStub.loadFeaturedChannels);
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
