import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { SharedModule } from '../../shared.module';
import { AuthenticatorService } from '../../../core/services/authentication/authenticator/authenticator.service';
import { stubAuthenticatorService } from '../../../testing/stubs/custom/authenticator.service.stub';
import { ChannelHttpService } from '../../../core/services/http/channel-http/channel-http.service';
import { stubChannelHttpService } from '../../../testing/stubs/custom/channel-http.service.stub';
import { BookmarkManagerService } from '../../../core/services/data-managers/bookmark-manager/bookmark-manager.service';
import { stubBookmarkManagerService } from '../../../testing/stubs/custom/bookmark-manager.service.stub';
import { EventManagerService } from '../../../core/services/events/event-manager.service';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';
import { stubViewHistoryManagerService } from '../../../testing/stubs/custom/view-history-manager.service.stub';
import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';

import { SidebarComponent } from './sidebar.component';

context('sidebar component unit test', () => {

    const followedChannelsKey = 'Followed Channels';
    const featuredChannelsKey = 'Featured Channels';
    const viewHistoryKey = 'View History';

    let eventManager: EventManagerService;
    let fixture: ComponentFixture<SidebarComponent>;
    let component: SidebarComponent;

    let authenticatorStub;
    let channelHttpStub;
    let bookmarkManagerStub;
    let viewHistoryManagerStub;

    beforeEach('stubs setup', () => {

        authenticatorStub = stubAuthenticatorService();
        channelHttpStub = stubChannelHttpService();
        bookmarkManagerStub = stubBookmarkManagerService();
        viewHistoryManagerStub = stubViewHistoryManagerService();

        const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
        bookmarkManagerStub.bookmarks = data.slice();
        viewHistoryManagerStub.histories = data.slice();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule],
            providers: [

                EventManagerService,
                { provide: AuthenticatorService, useValue: authenticatorStub },
                { provide: ChannelHttpService, useValue: channelHttpStub },
                { provide: BookmarkManagerService, useValue: bookmarkManagerStub },
                { provide: ViewHistoryManagerService, useValue: viewHistoryManagerStub },
                { provide: CustomRoutingService, useValue: {} }
            ]
        });

        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        authenticatorStub = TestBed.get(AuthenticatorService);
        channelHttpStub = TestBed.get(ChannelHttpService);
        bookmarkManagerStub = TestBed.get(BookmarkManagerService);
        eventManager = TestBed.get(EventManagerService);
        viewHistoryManagerStub = TestBed.get(ViewHistoryManagerService);
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(SidebarComponent);
    });

    it('should register routes on initialization', () => {

        const expected = component.options.length;
        fixture.detectChanges();

        expect(component.routes.size).to.equal(expected);
    });

    describe('ngOnInit()', () => {

        it('should load bookmarks on initialization', () => {

            const expected = bookmarkManagerStub.bookmarks.slice(0, 3);
            fixture.detectChanges();

            const result = component.badges.get(followedChannelsKey);

            expect(result).to.deep.equal(expected);
        });

        it('should not load bookmarks when not authenticated', () => {

            authenticatorStub.isAuthenticated = false;
            fixture.detectChanges();

            expect(component.badges.has(followedChannelsKey)).to.be.true;
            expect(component.badges.get(followedChannelsKey)).to.be.empty;
        });

        it('should use channel http service to fetch channel data', () => {

            fixture.detectChanges();

            sinonExpect.calledOnce(channelHttpStub.getChannels);
        });

        it('should load featured channels on initialization', fakeAsync(() => {

            const channels = [

                { id: 1, provider_game_name: 'name_1', game_name: 'name_1' },
                { id: 2, provider_game_name: 'name_2', game_name: 'name_2' },
                { id: 3, provider_game_name: 'name_3', game_name: 'name_3' },
                { id: 4, provider_game_name: 'name_4', game_name: 'name_4' },
                { id: 5, provider_game_name: 'name_5', game_name: 'name_5' }
            ];

            const expected = channels.slice(0, 3);
            channelHttpStub.getChannels.resolves(channels);
            fixture.detectChanges();
            tick();

            const result = component.badges.get(featuredChannelsKey);

            expect(result).to.deep.equal(expected);
        }));

        it('should not throw error when failed to load featured channels', () => {

            channelHttpStub.getChannels.rejects(new Error());
            fixture.detectChanges();
        });

        it('should load view histories on initialization', () => {

            const expected = viewHistoryManagerStub.histories.slice(0, 3);
            fixture.detectChanges();

            const result = component.badges.get(viewHistoryKey);

            expect(result).to.deep.equal(expected);
        });

        it('should not load view histories when not authenticated', () => {

            authenticatorStub.isAuthenticated = false;
            fixture.detectChanges();

            expect(component.badges.has(viewHistoryKey)).to.be.true;
            expect(component.badges.get(viewHistoryKey)).to.be.empty;
        });

        it('should register user logged out event listener on initialization', () => {

            component.badges.set(followedChannelsKey, []);
            component.badges.set(viewHistoryKey, []);
            fixture.detectChanges();

            eventManager.emit('userLoggedOut');

            expect(component.badges.has(followedChannelsKey)).to.be.false;
            expect(component.badges.has(viewHistoryKey)).to.be.false;
        });

        it('should register bookmark cached event listener on initialization', () => {

            bookmarkManagerStub.bookmarks = bookmarkManagerStub.bookmarks.slice(1);
            const expected = bookmarkManagerStub.bookmarks.slice(0, 3);
            fixture.detectChanges();

            eventManager.emit('bookmarkCached');

            const result = component.badges.get(followedChannelsKey);

            expect(result).to.deep.equal(expected);
        });

        it('should register followed channel event listener on initialization', () => {

            bookmarkManagerStub.bookmarks = bookmarkManagerStub.bookmarks.slice(1);
            const expected = bookmarkManagerStub.bookmarks.slice(0, 3);
            fixture.detectChanges();

            eventManager.emit('followedChannel');

            const result = component.badges.get(followedChannelsKey);

            expect(result).to.deep.equal(expected);
        });

        it('should register unfollowed channel event listener on initialization', () => {

            bookmarkManagerStub.bookmarks = bookmarkManagerStub.bookmarks.slice(1);
            const expected = bookmarkManagerStub.bookmarks.slice(0, 3);
            fixture.detectChanges();

            eventManager.emit('unfollowedChannel');

            const result = component.badges.get(followedChannelsKey);

            expect(result).to.deep.equal(expected);
        });

        it('should register view history cached event listener on initialization', () => {

            viewHistoryManagerStub.histories = viewHistoryManagerStub.histories.slice(1);
            const expected = viewHistoryManagerStub.histories.slice(0, 3);
            fixture.detectChanges();

            eventManager.emit('historyCached');

            const result = component.badges.get(viewHistoryKey);

            expect(result).to.deep.equal(expected);
        });

        it('should register view history updated event listener on initialization', () => {

            viewHistoryManagerStub.histories = viewHistoryManagerStub.histories.slice(1);
            const expected = viewHistoryManagerStub.histories.slice(0, 3);
            fixture.detectChanges();

            eventManager.emit('historyUpdated');

            const result = component.badges.get(viewHistoryKey);

            expect(result).to.deep.equal(expected);
        });

        it('should register view history removed event listener on initialization', () => {

            viewHistoryManagerStub.histories = viewHistoryManagerStub.histories.slice(1);
            const expected = viewHistoryManagerStub.histories.slice(0, 3);
            fixture.detectChanges();

            eventManager.emit('historyRemoved');

            const result = component.badges.get(viewHistoryKey);

            expect(result).to.deep.equal(expected);
        });

        it('should register view history cleared event listener on initialization', () => {

            viewHistoryManagerStub.histories = viewHistoryManagerStub.histories.slice(1);
            const expected = viewHistoryManagerStub.histories.slice(0, 3);
            fixture.detectChanges();

            eventManager.emit('historyCleared');

            const result = component.badges.get(viewHistoryKey);

            expect(result).to.deep.equal(expected);
        });
    });

    describe('options', () => {

        it('should return all options when authenticated', () => {

            authenticatorStub.isAuthenticated = true;
            fixture.detectChanges();

            expect(component.options.length).to.equal(3);
        });

        it('should return featured channel option only when not authenticated', () => {

            authenticatorStub.isAuthenticated = false;
            fixture.detectChanges();

            expect(component.options.length).to.equal(1);
            expect(component.options[0]).to.equal(featuredChannelsKey);
        });
    });
});
