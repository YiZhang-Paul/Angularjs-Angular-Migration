import { ComponentFixture, TestBed } from '@angular/core/testing';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { BookmarkModule } from '../bookmark.module';
import { BookmarkManagerService } from '../../../core/services/data-managers/bookmark-manager/bookmark-manager.service';
import { stubBookmarkManagerService } from '../../../testing/stubs/custom/bookmark-manager.service.stub';

import { BookmarkListComponent } from './bookmark-list.component';

context('bookmark list component unit test', () => {

    let fixture: ComponentFixture<BookmarkListComponent>;
    let component: BookmarkListComponent;

    let bookmarkManagerStub;

    beforeEach('stubs setup', () => {

        bookmarkManagerStub = stubBookmarkManagerService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [BookmarkModule],
            providers: [{ provide: BookmarkManagerService, useValue: bookmarkManagerStub }]
        });

        fixture = TestBed.createComponent(BookmarkListComponent);
        component = fixture.componentInstance;
        bookmarkManagerStub = TestBed.get(BookmarkManagerService);
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(BookmarkListComponent);
    });

    describe('$onInit()', () => {

        it('should use bookmark manager service to cache bookmarks on initialization', () => {

            fixture.detectChanges();

            sinonExpect.calledOnce(bookmarkManagerStub.cacheBookmarks);
        });
    });

    describe('bookmarks', () => {

        it('should reference bookmark manager service cache', () => {

            const expected = [{ id: 1 }, { id: 4 }];
            bookmarkManagerStub.bookmarks = expected;

            expect(component.bookmarks).to.deep.equal(expected);
        });
    });

    describe('unfollow()', () => {

        it('should use bookmark manager service to delete bookmark', () => {

            const expected = { id: 5 };

            component.unfollow(expected);

            sinonExpect.calledOnce(bookmarkManagerStub.unfollow);
            sinonExpect.calledWith(bookmarkManagerStub.unfollow, expected);
        });

        it('should not throw error when failed to delete bookmark', () => {

            bookmarkManagerStub.unfollow.rejects(new Error());

            component.unfollow({});

            sinonExpect.calledOnce(bookmarkManagerStub.unfollow);
        });
    });
});
