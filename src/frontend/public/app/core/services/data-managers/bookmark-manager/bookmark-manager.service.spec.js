import CoreModule from '../../../core.module.ajs';

import { stubBookmarkHttpServiceNg1 } from '../../../../testing/stubs/custom/bookmark-http.service.stub';
import { stubGenericUtilitiesServiceNg1 } from '../../../../testing/stubs/custom/generic-utilities.service.stub';
import { excludeIndex } from '../../utilities/generic-utilities/generic-utilities.service';

const module = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('bookmark manager service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let bookmarkHttpServiceStub;
    let genericUtilitiesServiceStub;

    beforeEach(module(CoreModule));

    beforeEach('stubs setup', () => {

        bookmarkHttpServiceStub = stubBookmarkHttpServiceNg1(module, inject);
        genericUtilitiesServiceStub = stubGenericUtilitiesServiceNg1(module, inject);

        bookmarkHttpServiceStub.setupStub();
        genericUtilitiesServiceStub.setupStub();
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

    describe('getBookmarks()', () => {

        it('should use bookmark http service to fetch data', () => {

            service.getBookmarks();
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkHttpServiceStub.getBookmarks);
        });

        it('should return bookmarks found', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            bookmarkHttpServiceStub.getBookmarks.returns($q.resolve(expected));

            service.getBookmarks().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should return empty collection when no bookmark found', () => {

            bookmarkHttpServiceStub.getBookmarks.returns($q.resolve([]));

            service.getBookmarks().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to retrieve data', () => {

            bookmarkHttpServiceStub.getBookmarks.returns($q.reject(new Error()));

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
            bookmarkHttpServiceStub.getBookmarks.returns($q.resolve(expected));

            service.cacheBookmarks();
            $rootScope.$apply();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        });

        it('should default to empty collection on failure', () => {

            bookmarkHttpServiceStub.getBookmarks.returns($q.reject(new Error()));

            service.cacheBookmarks();
            $rootScope.$apply();

            expect(Array.isArray(service.bookmarks)).to.be.true;
            expect(service.bookmarks).to.be.empty;
        });
    });

    describe('isFollowed()', () => {

        it('should return true when bookmark with matching channel id is found', () => {

            genericUtilitiesServiceStub.hasOwnProperties.returns(false);
            genericUtilitiesServiceStub.findByProperties.returns({ id: 5 });
            const data = { channel_id: 15 };

            const result = service.isFollowed(data);

            expect(result).to.be.true;
            sinonExpect.calledOnce(genericUtilitiesServiceStub.hasOwnProperties);
            sinonExpect.calledOnce(genericUtilitiesServiceStub.findByProperties);
        });

        it('should return true when bookmark with matching provider information is found', () => {

            genericUtilitiesServiceStub.hasOwnProperties.returns(true);
            genericUtilitiesServiceStub.findByProperties.returns({ id: 5 });

            const result = service.isFollowed({});

            expect(result).to.be.true;
            sinonExpect.calledOnce(genericUtilitiesServiceStub.hasOwnProperties);
            sinonExpect.calledOnce(genericUtilitiesServiceStub.findByProperties);
        });

        it('should return false when input data is invalid', () => {

            genericUtilitiesServiceStub.hasOwnProperties.returns(false);

            const result = service.isFollowed({});

            expect(result).to.be.false;
            sinonExpect.calledOnce(genericUtilitiesServiceStub.hasOwnProperties);
            sinonExpect.notCalled(genericUtilitiesServiceStub.findByProperties);
        });

        it('should return false when no bookmark with matching channel id is found', () => {

            genericUtilitiesServiceStub.hasOwnProperties.returns(false);
            genericUtilitiesServiceStub.findByProperties.returns(null);

            const result = service.isFollowed({ channel_id: 15 });

            expect(result).to.be.false;
            sinonExpect.calledOnce(genericUtilitiesServiceStub.hasOwnProperties);
            sinonExpect.calledOnce(genericUtilitiesServiceStub.findByProperties);
        });

        it('should return false when no bookmark with matching provider information is found', () => {

            genericUtilitiesServiceStub.hasOwnProperties.returns(true);
            genericUtilitiesServiceStub.findByProperties.returns(null);

            const result = service.isFollowed({});

            expect(result).to.be.false;
            sinonExpect.calledOnce(genericUtilitiesServiceStub.hasOwnProperties);
            sinonExpect.calledOnce(genericUtilitiesServiceStub.findByProperties);
        });
    });

    describe('follow()', () => {

        it('should use bookmark http service to add bookmark', () => {

            service.follow({});
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkHttpServiceStub.addBookmark);
        });

        it('should cache bookmarks when added successfully', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            bookmarkHttpServiceStub.getBookmarks.returns($q.resolve(expected));

            service.follow({}).then(() => {

                sinonExpect.calledOnce(bookmarkHttpServiceStub.getBookmarks);
                expect(service.bookmarks).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should raise event when successfully added bookmark', () => {

            service.follow({});
            $rootScope.$apply();

            sinonExpect.calledOnce($rootScope.$broadcast);
            sinonExpect.calledWith($rootScope.$broadcast, 'followedChannel');
        });

        it('should not cache bookmarks when failed to add bookmark', () => {

            const expected = { status: 400 };
            bookmarkHttpServiceStub.addBookmark.returns($q.reject(expected));

            service.follow({}).catch(() => null);
            $rootScope.$apply();

            sinonExpect.notCalled(bookmarkHttpServiceStub.getBookmarks);
        });

        it('should not raise event when failed to add bookmark', () => {

            bookmarkHttpServiceStub.addBookmark.returns($q.reject(new Error()));

            service.follow({}).catch(() => null);
            $rootScope.$apply();

            sinonExpect.notCalled($rootScope.$broadcast);
        });

        it('should throw error when failed to add bookmark', () => {

            const expected = { status: 400 };
            bookmarkHttpServiceStub.addBookmark.returns($q.reject(expected));

            service.follow({})
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error).to.deep.equal(expected));

            $rootScope.$apply();
        });
    });

    describe('unfollow()', () => {

        beforeEach('unfollow() test setup', () => {

            genericUtilitiesServiceStub.findByProperties.returns({ id: 0 });
        });

        it('should use bookmark http service to delete bookmark', () => {

            const expected = 5;
            genericUtilitiesServiceStub.findByProperties.returns({ id: expected });

            service.unfollow({});
            $rootScope.$apply();

            sinonExpect.calledOnce(genericUtilitiesServiceStub.findByProperties);
            sinonExpect.calledOnce(bookmarkHttpServiceStub.deleteBookmark);
            sinonExpect.calledWith(bookmarkHttpServiceStub.deleteBookmark, expected);
        });

        it('should remove bookmark from cache when successfully deleted bookmark', () => {

            service.bookmarks = [{ id: 1 }, { id: 4 }, { id: 7 }];

            const index = 1;
            const bookmark = service.bookmarks[index];
            const expected = excludeIndex(service.bookmarks, index);
            genericUtilitiesServiceStub.findByProperties.returns(bookmark);

            service.unfollow({});
            $rootScope.$apply();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        });

        it('should raise event when successfully deleted bookmark', () => {

            service.unfollow({});
            $rootScope.$apply();

            sinonExpect.calledOnce($rootScope.$broadcast);
            sinonExpect.calledWith($rootScope.$broadcast, 'unfollowedChannel');
        });

        it('should not remove bookmark from cache when failed to delete bookmark', () => {

            service.bookmarks = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.bookmarks.slice();
            bookmarkHttpServiceStub.deleteBookmark.returns($q.reject(new Error()));
            genericUtilitiesServiceStub.findByProperties.returns({ id: expected[1].id });

            service.unfollow({}).catch(() => null);
            $rootScope.$apply();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        });

        it('should not raise event when failed to delete bookmark', () => {

            bookmarkHttpServiceStub.deleteBookmark.returns($q.reject(new Error()));

            service.unfollow({}).catch(() => null);
            $rootScope.$apply();

            sinonExpect.notCalled($rootScope.$broadcast);
        });

        it('should throw error when failed to delete bookmark', () => {

            const expected = { status: 400 };
            bookmarkHttpServiceStub.deleteBookmark.returns($q.reject(expected));

            service.unfollow({})
                .then(() => $q.reject(new Error()))
                .catch(error => expect(error).to.deep.equal(expected));

            $rootScope.$apply();
        });
    });
});
