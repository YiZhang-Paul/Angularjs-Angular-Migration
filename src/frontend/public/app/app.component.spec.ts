import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { AuthenticatorService } from './core/services/authentication/authenticator/authenticator.service';
import { BookmarkManagerService } from './core/services/data-managers/bookmark-manager/bookmark-manager.service';
import { GameManagerService } from './core/services/data-managers/game-manager/game-manager.service';
import { ViewHistoryManagerService } from './core/services/data-managers/view-history-manager/view-history-manager.service';
import { EventManagerService } from './core/services/events/event-manager.service';
import { stubAuthenticatorService } from './testing/stubs/custom/authenticator.service.stub';
import { stubBookmarkManagerService } from './testing/stubs/custom/bookmark-manager.service.stub';
import { stubGameManagerService } from './testing/stubs/custom/game-manager.service.stub';
import { stubViewHistoryManagerService } from './testing/stubs/custom/view-history-manager.service.stub';
import { stubEventManagerService } from './testing/stubs/custom/event-manager.service.stub';
import { AppComponent } from './app.component';

@Component({ selector: 'top-navigation-bar', template: '<div></div>' })
class TopNavigationBarComponentForTest { }

@Component({ selector: 'sidebar', template: '<div></div>' })
class SidebarComponentForTest { }

@Component({ selector: 'ui-view', template: '<div></div>' })
class UIViewForTest { }

context('app component unit test', () => {

    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    let authenticatorStub;
    let bookmarkManagerStub;
    let gameManagerStub;
    let viewHistoryManagerStub;
    let eventManagerStub;

    beforeEach('stubs setup', () => {

        authenticatorStub = stubAuthenticatorService();
        bookmarkManagerStub = stubBookmarkManagerService();
        gameManagerStub = stubGameManagerService();
        viewHistoryManagerStub = stubViewHistoryManagerService();
        eventManagerStub = stubEventManagerService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            declarations: [
                AppComponent,
                TopNavigationBarComponentForTest,
                SidebarComponentForTest,
                UIViewForTest
            ],
            providers: [

                { provide: AuthenticatorService, useValue: authenticatorStub },
                { provide: BookmarkManagerService, useValue: bookmarkManagerStub },
                { provide: GameManagerService, useValue: gameManagerStub },
                { provide: ViewHistoryManagerService, useValue: viewHistoryManagerStub },
                { provide: EventManagerService, useValue: eventManagerStub }
            ]
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        authenticatorStub = TestBed.get(AuthenticatorService);
        bookmarkManagerStub = TestBed.get(BookmarkManagerService);
        gameManagerStub = TestBed.get(GameManagerService);
        viewHistoryManagerStub = TestBed.get(ViewHistoryManagerService);
        eventManagerStub = TestBed.get(EventManagerService);
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(AppComponent);
    });

    describe('$onInit()', () => {

        it('should cache bookmarks on initialization when user is authenticated', () => {

            fixture.detectChanges();

            sinonExpect.calledOnce(bookmarkManagerStub.cacheBookmarks);
        });

        it('should not cache bookmarks on initialization when user is not authenticated', () => {

            authenticatorStub.isAuthenticated = false;

            fixture.detectChanges();

            sinonExpect.notCalled(bookmarkManagerStub.cacheBookmarks);
        });

        it('should cache view histories on initialization when user is authenticated', () => {

            fixture.detectChanges();

            sinonExpect.calledOnce(viewHistoryManagerStub.cacheHistories);
        });

        it('should not cache view histories on initialization when user is not authenticated', () => {

            authenticatorStub.isAuthenticated = false;

            fixture.detectChanges();

            sinonExpect.notCalled(viewHistoryManagerStub.cacheHistories);
        });

        it('should cache games on initialization', () => {

            fixture.detectChanges();

            sinonExpect.calledOnce(gameManagerStub.cacheGames);
        });
    });
});
