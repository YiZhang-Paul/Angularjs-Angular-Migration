import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { BookmarkHttpService } from '../../../services/http/bookmark-http/bookmark-http.service';
import { EventManagerService } from '../../../services/events/event-manager.service';
import { stubToastrService } from '../../../../testing/stubs/third-party/toastr.stub';
import { stubBookmarkHttpService } from '../../../../testing/stubs/custom/bookmark-http.service.stub';
import { stubEventManagerService } from '../../../../testing/stubs/custom/event-manager.service.stub';

import { BookmarkManagerService } from './bookmark-manager.service';

context('bookmark manager service unit test', () => {

    let service: BookmarkManagerService;

    let toastrStub;
    let bookmarkHttpStub;
    let eventManagerStub;

    beforeEach('stubs setup', () => {

        toastrStub = stubToastrService();
        bookmarkHttpStub = stubBookmarkHttpService();
        eventManagerStub = stubEventManagerService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            providers: [

                BookmarkManagerService,
                { provide: ToastrService, useValue: toastrStub },
                { provide: BookmarkHttpService, useValue: bookmarkHttpStub },
                { provide: EventManagerService, useValue: eventManagerStub }
            ]
        });

        service = TestBed.get(BookmarkManagerService);
        toastrStub = TestBed.get(ToastrService);
        bookmarkHttpStub = TestBed.get(BookmarkHttpService);
        eventManagerStub = TestBed.get(EventManagerService);
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(BookmarkManagerService);
    });

    describe('cacheBookmarks()', () => {

        it('should use bookmark http service to fetch data', () => {

            service.cacheBookmarks();

            sinonExpect.calledOnce(bookmarkHttpStub.getBookmarks);
        });

        it('should cache bookmarks on success', fakeAsync(() => {

            const expected = [{ id: 1 }, { id: 5 }];
            bookmarkHttpStub.getBookmarks.resolves(expected);

            service.cacheBookmarks();
            tick();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        }));

        it('should default to empty collection on failure', fakeAsync(() => {

            bookmarkHttpStub.getBookmarks.rejects(new Error());

            service.cacheBookmarks();
            tick();

            expect(Array.isArray(service.bookmarks)).to.be.true;
            expect(service.bookmarks).to.be.empty;
        }));

        it('should raise event when successfully cached bookmark', fakeAsync(() => {

            service.cacheBookmarks();
            tick();

            sinonExpect.calledOnce(eventManagerStub.emit);
            sinonExpect.calledWith(eventManagerStub.emit, 'bookmarkCached');
        }));
    });

    describe('isFollowed()', () => {

        beforeEach('isFollowed() test setup', () => {

            service.bookmarks = [

                { channel_id: 0 },
                { provider_id: 1, provider_channel_id: 97 },
                { channel_id: 15 }
            ];
        });

        it('should return true when bookmark with matching channel id is found', () => {

            const channelId = service.bookmarks[2].channel_id;
            const data = { channel_id: channelId };

            const result = service.isFollowed(data);

            expect(result).to.be.true;
        });

        it('should return true when bookmark with matching provider information is found', () => {

            const bookmark = service.bookmarks[1];

            const data = {

                provider_id: bookmark.provider_id,
                provider_channel_id: bookmark.provider_channel_id
            };

            const result = service.isFollowed(data);

            expect(result).to.be.true;
        });

        it('should return false when input data is invalid', () => {

            const data = { invalid_field: 'random_value' };

            const result = service.isFollowed(data);

            expect(result).to.be.false;
        });

        it('should return false when no bookmark with matching channel id is found', () => {

            const data = { channel_id: -1 };

            const result = service.isFollowed(data);

            expect(result).to.be.false;
        });

        it('should return false when no bookmark with matching provider information is found', () => {

            const data = { provider_id: 0, provider_channel_id: -1 };

            const result = service.isFollowed(data);

            expect(result).to.be.false;
        });
    });

    describe('follow()', () => {

        it('should use bookmark http service to add bookmark', () => {

            service.follow({});

            sinonExpect.calledOnce(bookmarkHttpStub.addBookmark);
        });

        it('should cache bookmarks when added successfully', fakeAsync(() => {

            const expected = [{ id: 1 }, { id: 5 }];
            bookmarkHttpStub.getBookmarks.resolves(expected);

            service.follow({}).then(() => {

                sinonExpect.calledOnce(bookmarkHttpStub.getBookmarks);
                expect(service.bookmarks).to.deep.equal(expected);
            });

            tick();
        }));

        it('should raise event when successfully added bookmark', fakeAsync(() => {

            service.follow({});
            tick();
            // caching bookmark will also raise event
            sinonExpect.calledTwice(eventManagerStub.emit);
            sinonExpect.calledWith(eventManagerStub.emit, 'followedChannel');
        }));

        it('should display notification when successfully added bookmark', fakeAsync(() => {

            service.follow({});
            tick();

            sinonExpect.calledOnce(toastrStub.success);
        }));

        it('should not cache bookmarks when failed to add bookmark', fakeAsync(() => {

            const expected = { status: 400 };
            bookmarkHttpStub.addBookmark.rejects(expected);

            service.follow({});
            tick();

            sinonExpect.notCalled(bookmarkHttpStub.getBookmarks);
        }));

        it('should not raise event when failed to add bookmark', fakeAsync(() => {

            bookmarkHttpStub.addBookmark.rejects(new Error());

            service.follow({});
            tick();

            sinonExpect.notCalled(eventManagerStub.emit);
        }));

        it('should not throw error when failed to add bookmark', fakeAsync(() => {

            bookmarkHttpStub.addBookmark.rejects(new Error());

            service.follow({});
            tick();
        }));
    });

    describe('unfollow()', () => {

        let data;

        beforeEach('unfollow() test setup', () => {

            service.bookmarks = [

                { id: 0, channel_id: 0 },
                { id: 1, provider_id: 1, provider_channel_id: 97 },
                { id: 5, channel_id: 15 }
            ];

            data = service.bookmarks[2];
        });

        it('should use bookmark http service to delete bookmark', () => {

            const expected = data.id;

            service.unfollow(data);

            sinonExpect.calledOnce(bookmarkHttpStub.deleteBookmark);
            sinonExpect.calledWith(bookmarkHttpStub.deleteBookmark, expected);
        });

        it('should remove bookmark from cache when successfully deleted bookmark', fakeAsync(() => {

            const expected = service.bookmarks.slice(0, -1);

            service.unfollow(data);
            tick();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        }));

        it('should raise event when successfully deleted bookmark', fakeAsync(() => {

            service.unfollow(data);
            tick();

            sinonExpect.calledOnce(eventManagerStub.emit);
            sinonExpect.calledWith(eventManagerStub.emit, 'unfollowedChannel');
        }));

        it('should display notification when successfully deleted bookmark', fakeAsync(() => {

            service.unfollow(data);
            tick();

            sinonExpect.calledOnce(toastrStub.error);
        }));

        it('should not remove bookmark from cache when failed to delete bookmark', fakeAsync(() => {

            const expected = service.bookmarks.slice();
            bookmarkHttpStub.deleteBookmark.rejects(new Error());

            service.unfollow(data);
            tick();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        }));

        it('should not raise event when failed to delete bookmark', fakeAsync(() => {

            bookmarkHttpStub.deleteBookmark.rejects(new Error());

            service.unfollow(data);
            tick();

            sinonExpect.notCalled(eventManagerStub.emit);
        }));

        it('should not throw error when failed to delete bookmark', fakeAsync(() => {

            bookmarkHttpStub.deleteBookmark.rejects(new Error());

            service.unfollow(data);
            tick();
        }));
    });
});
