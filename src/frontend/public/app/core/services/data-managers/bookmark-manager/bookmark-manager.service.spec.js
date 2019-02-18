import CoreModule from '../../../core.module.ajs';

import { stubToastrNg1 } from '../../../../testing/stubs/third-party/toastr.stub';
import { stubBookmarkHttpServiceNg1 } from '../../../../testing/stubs/custom/bookmark-http.service.stub';

const module = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('bookmark manager service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let toastrStub;
    let bookmarkHttpStub;

    beforeEach(module(CoreModule));

    beforeEach('stubs setup', () => {

        toastrStub = stubToastrNg1(module, inject);
        bookmarkHttpStub = stubBookmarkHttpServiceNg1(module, inject);

        toastrStub.setupStub();
        bookmarkHttpStub.setupStub();
    });

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('bookmarkManagerService');

        stub($rootScope, '$broadcast').callThrough();
    }));

    beforeEach('clear $locationChangeStart and $locationChangeSuccess broadcast', () => {

        $rootScope.$apply();
        $rootScope.$broadcast.resetHistory();
    });

    afterEach('general test teardown', () => {

        $rootScope.$broadcast.restore();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('cacheBookmarks()', () => {

        it('should use bookmark http service to fetch data', () => {

            service.cacheBookmarks();
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkHttpStub.getBookmarks);
        });

        it('should cache bookmarks on success', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            bookmarkHttpStub.getBookmarks.returns($q.resolve(expected));

            service.cacheBookmarks();
            $rootScope.$apply();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        });

        it('should default to empty collection on failure', () => {

            bookmarkHttpStub.getBookmarks.returns($q.reject(new Error()));

            service.cacheBookmarks();
            $rootScope.$apply();

            expect(Array.isArray(service.bookmarks)).to.be.true;
            expect(service.bookmarks).to.be.empty;
        });

        it('should raise event when successfully cached bookmark', () => {

            service.cacheBookmarks();
            $rootScope.$apply();

            sinonExpect.calledOnce($rootScope.$broadcast);
            sinonExpect.calledWith($rootScope.$broadcast, 'bookmarkCached');
        });
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
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkHttpStub.addBookmark);
        });

        it('should cache bookmarks when added successfully', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            bookmarkHttpStub.getBookmarks.returns($q.resolve(expected));

            service.follow({}).then(() => {

                sinonExpect.calledOnce(bookmarkHttpStub.getBookmarks);
                expect(service.bookmarks).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should raise event when successfully added bookmark', () => {

            service.follow({});
            $rootScope.$apply();
            // caching bookmark will also raise event
            sinonExpect.calledTwice($rootScope.$broadcast);
            sinonExpect.calledWith($rootScope.$broadcast, 'followedChannel');
        });

        it('should display notification when successfully added bookmark', () => {

            service.follow({});
            $rootScope.$apply();

            sinonExpect.calledOnce(toastrStub.success);
        });

        it('should not cache bookmarks when failed to add bookmark', () => {

            const expected = { status: 400 };
            bookmarkHttpStub.addBookmark.returns($q.reject(expected));

            service.follow({});
            $rootScope.$apply();

            sinonExpect.notCalled(bookmarkHttpStub.getBookmarks);
        });

        it('should not raise event when failed to add bookmark', () => {

            bookmarkHttpStub.addBookmark.returns($q.reject(new Error()));

            service.follow({});
            $rootScope.$apply();

            sinonExpect.notCalled($rootScope.$broadcast);
        });

        it('should not throw error when failed to add bookmark', () => {

            bookmarkHttpStub.addBookmark.returns($q.reject(new Error()));

            service.follow({});
            $rootScope.$apply();
        });
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
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkHttpStub.deleteBookmark);
            sinonExpect.calledWith(bookmarkHttpStub.deleteBookmark, expected);
        });

        it('should remove bookmark from cache when successfully deleted bookmark', () => {

            const expected = service.bookmarks.slice(0, -1);

            service.unfollow(data);
            $rootScope.$apply();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        });

        it('should raise event when successfully deleted bookmark', () => {

            service.unfollow(data);
            $rootScope.$apply();

            sinonExpect.calledOnce($rootScope.$broadcast);
            sinonExpect.calledWith($rootScope.$broadcast, 'unfollowedChannel');
        });

        it('should display notification when successfully deleted bookmark', () => {

            service.unfollow(data);
            $rootScope.$apply();

            sinonExpect.calledOnce(toastrStub.error);
        });

        it('should not remove bookmark from cache when failed to delete bookmark', () => {

            const expected = service.bookmarks.slice();
            bookmarkHttpStub.deleteBookmark.returns($q.reject(new Error()));

            service.unfollow(data);
            $rootScope.$apply();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        });

        it('should not raise event when failed to delete bookmark', () => {

            bookmarkHttpStub.deleteBookmark.returns($q.reject(new Error()));

            service.unfollow(data);
            $rootScope.$apply();

            sinonExpect.notCalled($rootScope.$broadcast);
        });

        it('should not throw error when failed to delete bookmark', () => {

            bookmarkHttpStub.deleteBookmark.returns($q.reject(new Error()));

            service.unfollow(data);
            $rootScope.$apply();
        });
    });
});
