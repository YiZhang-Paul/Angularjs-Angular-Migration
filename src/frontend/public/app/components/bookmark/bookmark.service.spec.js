import SharedModule from '../../shared/shared.module';
import ComponentsModule from '../components.module';

import { excludeIndex } from '../../shared/utilities/utilities';
import { hasMatchingValue } from '../../shared/utilities/test-verifications';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('bookmark service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let getBookmarksStub;
    let addBookmarkStub;
    let deleteBookmarkStub;
    let $broadcastStub;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock bookmark http service setup', mockModule($provide => {

        getBookmarksStub = stub();
        addBookmarkStub = stub();
        deleteBookmarkStub = stub();

        $provide.service('bookmarkHttpService', () => ({

            getBookmarks: getBookmarksStub,
            addBookmark: addBookmarkStub,
            deleteBookmark: deleteBookmarkStub
        }));
    }));

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('bookmarkService');

        $broadcastStub = stub($rootScope, '$broadcast').callThrough();
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

    afterEach('general test teardown', () => {

        $broadcastStub.restore();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getBookmarks()', () => {

        it('should use bookmark http service to fetch data', () => {

            getBookmarksStub.returns($q.resolve([]));

            service.getBookmarks();
            $rootScope.$apply();

            sinonExpect.calledOnce(getBookmarksStub);
        });

        it('should return bookmarks found', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            getBookmarksStub.returns($q.resolve(expected));

            service.getBookmarks().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should return empty collection when no bookmark found', () => {

            getBookmarksStub.returns($q.resolve([]));

            service.getBookmarks().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to retrieve data', () => {

            getBookmarksStub.returns($q.reject(new Error()));

            service.getBookmarks().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });
    });

    describe('cacheBookmarks()', () => {

        it('should cache bookmarks on success', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            getBookmarksStub.returns($q.resolve(expected));

            service.cacheBookmarks();
            $rootScope.$apply();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        });

        it('should default to empty collection on failure', () => {

            getBookmarksStub.returns($q.reject(new Error()));

            service.cacheBookmarks();
            $rootScope.$apply();

            expect(Array.isArray(service.bookmarks)).to.be.true;
            expect(service.bookmarks).to.be.empty;
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

            addBookmarkStub.returns($q.resolve({}));
            getBookmarksStub.returns($q.resolve([]));

            service.follow({});

            sinonExpect.calledOnce(addBookmarkStub);
        });

        it('should cache bookmarks when added successfully', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            addBookmarkStub.returns($q.resolve({}));
            getBookmarksStub.returns($q.resolve(expected));

            service.follow({}).then(() => {

                sinonExpect.calledOnce(getBookmarksStub);
                expect(service.bookmarks).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should not cache bookmarks when failed to add bookmark', () => {

            const expected = { status: 400 };
            addBookmarkStub.returns($q.reject(expected));

            service.follow({})
                .then(() => $q.reject(new Error()))
                .catch(() => sinonExpect.notCalled(getBookmarksStub));

            $rootScope.$apply();
        });

        it('should throw error when failed to add bookmark', () => {

            const expected = { status: 400 };
            addBookmarkStub.returns($q.reject(expected));

            service.follow({})
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error).to.deep.equal(expected));

            $rootScope.$apply();
        });
    });

    describe('unfollow()', () => {

        beforeEach('unfollow() test setup', () => {
            // clear $locationChangeStart and $locationChangeSuccess broadcast
            $rootScope.$apply();
            $broadcastStub.resetHistory();
        });

        it('should use bookmark http service to delete bookmark', () => {

            const bookmark = service.bookmarks[2];
            const expected = bookmark.id;
            deleteBookmarkStub.returns($q.resolve({}));

            service.unfollow(bookmark);
            $rootScope.$apply();

            sinonExpect.calledOnce(deleteBookmarkStub);
            sinonExpect.calledWith(deleteBookmarkStub, expected);
        });

        it('should remove bookmark from cache when successfully deleted bookmark', () => {

            const index = 2;
            const bookmark = service.bookmarks[index];
            const expected = excludeIndex(service.bookmarks, index);
            deleteBookmarkStub.returns($q.resolve({}));

            service.unfollow(bookmark);
            $rootScope.$apply();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        });

        it('should raise event when successfully deleted bookmark', () => {

            const bookmark = service.bookmarks[2];
            deleteBookmarkStub.returns($q.resolve({}));

            service.unfollow(bookmark);
            $rootScope.$apply();

            sinonExpect.calledOnce($broadcastStub);
            sinonExpect.calledWith($broadcastStub, 'unfollowedChannel');
        });

        it('should not remove bookmark from cache when failed to delete bookmark', () => {

            const expected = service.bookmarks.slice();
            deleteBookmarkStub.returns($q.reject(new Error()));

            service.unfollow({}).catch(() => null);
            $rootScope.$apply();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        });

        it('should not raise event when failed to delete bookmark', () => {

            deleteBookmarkStub.returns($q.reject(new Error()));

            service.unfollow({}).catch(() => null);
            $rootScope.$apply();

            sinonExpect.notCalled($broadcastStub);
        });

        it('should throw error when failed to delete bookmark', () => {

            const expected = { status: 400 };
            deleteBookmarkStub.returns($q.reject(expected));

            service.unfollow({})
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error).to.deep.equal(expected));

            $rootScope.$apply();
        });
    });
});
