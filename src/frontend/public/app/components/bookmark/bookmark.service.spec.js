import SharedModule from '../../shared/shared.module';
import ComponentsModule from '../components.module';

import { hasMatchingValue } from '../../shared/utilities/test-utilities/test-verifications';

import { BookmarkService } from './bookmark.service';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('bookmark service unit test', () => {

    let getBookmarksStub;
    let addBookmarkStub;
    let deleteBookmarkStub;

    let q;
    let scope;
    let service;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(ComponentsModule));

    beforeEach('test setup', inject($injector => {

        const bookmarkHttpService = $injector.get('bookmarkHttpService');
        getBookmarksStub = stub(bookmarkHttpService, 'getBookmarks');
        addBookmarkStub = stub(bookmarkHttpService, 'addBookmark');
        deleteBookmarkStub = stub(bookmarkHttpService, 'deleteBookmark');

        q = $injector.get('$q');
        scope = $injector.get('$rootScope');
        getBookmarksStub.returns(q.resolve([]));
        service = $injector.get('bookmarkService');
        getBookmarksStub.reset();
    }));

    beforeEach('mock data setup', () => {

        service.bookmarks = [

            { id: 9, provider_id: 1, provider_channel_id: 87 },
            { id: 2, provider_id: 0, provider_channel_id: 22 },
            { id: 5, channel_id: 19 },
            { id: 7, channel_id: 11 },
            { id: 9, provider_id: 2, provider_channel_id: 54 }
        ];
    });

    afterEach('test teardown', () => {

        getBookmarksStub.restore();
        addBookmarkStub.restore();
        deleteBookmarkStub.restore();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    it('should load bookmarks on instantiation', inject($injector => {

        const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
        getBookmarksStub.returns(q.resolve(expected));

        service = $injector.instantiate(BookmarkService);
        scope.$apply();

        expect(service.bookmarks).to.deep.equal(expected);
    }));

    describe('getBookmarks()', () => {

        it('should use bookmark http service to fetch data', () => {

            getBookmarksStub.returns(q.resolve([]));

            service.getBookmarks();

            sinonExpect.calledOnce(getBookmarksStub);
        });

        it('should return bookmarks found', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            getBookmarksStub.returns(q.resolve(expected));

            service.getBookmarks().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            scope.$apply();
        });

        it('should return empty collection when no bookmark found', () => {

            getBookmarksStub.returns(q.resolve([]));

            service.getBookmarks().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            scope.$apply();
        });

        it('should return empty collection when failed to retrieve data', () => {

            getBookmarksStub.returns(q.reject(new Error()));

            service.getBookmarks().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            scope.$apply();
        });
    });

    describe('isFollowed()', () => {

        it('should return true when bookmark with matching channel id is found', () => {

            const channelId = service.bookmarks[2].channel_id;
            const data = { channel_id: channelId };

            expect(channelId).is.not.undefined;
            expect(service.isFollowed(data)).to.be.true;
        });

        it('should return true when bookmark with matching provider information is found', () => {

            const bookmark = service.bookmarks[1];
            const providerId = bookmark.provider_id;
            const providerChannelId = bookmark.provider_channel_id;
            const data = { provider_id: providerId, provider_channel_id: providerChannelId };

            expect(providerId).is.not.undefined;
            expect(providerChannelId).is.not.undefined;
            expect(service.isFollowed(data)).to.be.true;
        });

        it('should return false when input data is invalid', () => {

            expect(service.isFollowed({})).to.be.false;
        });

        it('should return false when no bookmark with matching channel id is found', () => {

            const bookmarks = service.bookmarks;
            const data = { channel_id: -1 };

            expect(hasMatchingValue(data, bookmarks, 'channel_id')).to.be.false;
            expect(service.isFollowed(data)).to.be.false;
        });

        it('should return false when no bookmark with matching provider information is found', () => {

            const bookmarks = service.bookmarks;
            const data = { provider_id: -1, provider_channel_id: -1 };

            expect(hasMatchingValue(data, bookmarks, 'provider_id')).to.be.false;
            expect(hasMatchingValue(data, bookmarks, 'provider_channel_id')).to.be.false;
            expect(service.isFollowed(data)).to.be.false;
        });
    });

    describe('follow()', () => {

        it('should use bookmark http service to add bookmark', () => {

            addBookmarkStub.returns(q.resolve({}));
            getBookmarksStub.returns(q.resolve([]));

            service.follow({});

            sinonExpect.calledOnce(addBookmarkStub);
        });

        it('should cache bookmarks when added successfully', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            addBookmarkStub.returns(q.resolve({}));
            getBookmarksStub.returns(q.resolve(expected));

            service.follow({}).then(() => {

                sinonExpect.calledOnce(getBookmarksStub);
                expect(service.bookmarks).to.deep.equal(expected);
            });

            scope.$apply();
        });

        it('should not cache bookmarks when failed to add bookmark', () => {

            const expected = { status: 400 };
            addBookmarkStub.returns(q.reject(expected));

            service.follow({})
                .then(() => q.reject(new Error()))
                .catch(() => sinonExpect.notCalled(getBookmarksStub));

            scope.$apply();
        });

        it('should throw error when failed to add bookmark', () => {

            const expected = { status: 400 };
            addBookmarkStub.returns(q.reject(expected));

            service.follow({})
                .then(() => q.reject(new Error()))
                .catch(error => expect(error).to.deep.equal(expected));

            scope.$apply();
        });
    });

    describe('unfollow()', () => {

        it('should use bookmark http service to delete bookmark', () => {

            const bookmark = service.bookmarks[2];
            const channelId = bookmark.channel_id;
            const expected = bookmark.id;
            deleteBookmarkStub.returns(q.resolve({}));
            getBookmarksStub.returns(q.resolve([]));

            service.unfollow({ channel_id: channelId });

            sinonExpect.calledOnce(deleteBookmarkStub);
            sinonExpect.calledWith(deleteBookmarkStub, expected);
        });

        it('should cache bookmarks when deleted successfully', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            deleteBookmarkStub.returns(q.resolve({}));
            getBookmarksStub.returns(q.resolve(expected));

            service.unfollow({}).then(() => {

                sinonExpect.calledOnce(getBookmarksStub);
                expect(service.bookmarks).to.deep.equal(expected);
            });

            scope.$apply();
        });

        it('should not cache bookmarks when failed to delete bookmark', () => {

            const expected = { status: 400 };
            deleteBookmarkStub.returns(q.reject(expected));

            service.unfollow({})
                .then(() => q.reject(new Error()))
                .catch(() => sinonExpect.notCalled(getBookmarksStub));

            scope.$apply();
        });

        it('should throw error when failed to add bookmark', () => {

            const expected = { status: 400 };
            deleteBookmarkStub.returns(q.reject(expected));

            service.unfollow({})
                .then(() => q.reject(new Error()))
                .catch(error => expect(error).to.deep.equal(expected));

            scope.$apply();
        });
    });
});
