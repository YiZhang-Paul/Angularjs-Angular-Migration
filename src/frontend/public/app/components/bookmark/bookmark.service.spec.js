import ComponentsModule from '../components.module';

import { mockBookmarkHttpService } from '../../../testing/stubs/bookmark-http.service.stub';
import { mockGenericUtilityService } from '../../../testing/stubs/generic-utility.service.stub';
import { excludeIndex } from '../../shared/services/generic-utility.service';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('bookmark service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let bookmarkHttpServiceStub;
    let genericUtilityServiceStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mocks setup', () => {

        bookmarkHttpServiceStub = mockBookmarkHttpService(mockModule, inject);
        genericUtilityServiceStub = mockGenericUtilityService(mockModule);

        bookmarkHttpServiceStub.initializeMock();
    });

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('bookmarkService');

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

            genericUtilityServiceStub.hasOwnProperties.returns(false);
            genericUtilityServiceStub.findByProperties.returns({ id: 5 });
            const data = { channel_id: 15 };

            const result = service.isFollowed(data);

            expect(result).to.be.true;
            sinonExpect.calledOnce(genericUtilityServiceStub.hasOwnProperties);
            sinonExpect.calledOnce(genericUtilityServiceStub.findByProperties);
        });

        it('should return true when bookmark with matching provider information is found', () => {

            genericUtilityServiceStub.hasOwnProperties.returns(true);
            genericUtilityServiceStub.findByProperties.returns({ id: 5 });

            const result = service.isFollowed({});

            expect(result).to.be.true;
            sinonExpect.calledOnce(genericUtilityServiceStub.hasOwnProperties);
            sinonExpect.calledOnce(genericUtilityServiceStub.findByProperties);
        });

        it('should return false when input data is invalid', () => {

            genericUtilityServiceStub.hasOwnProperties.returns(false);

            const result = service.isFollowed({});

            expect(result).to.be.false;
            sinonExpect.calledOnce(genericUtilityServiceStub.hasOwnProperties);
            sinonExpect.notCalled(genericUtilityServiceStub.findByProperties);
        });

        it('should return false when no bookmark with matching channel id is found', () => {

            genericUtilityServiceStub.hasOwnProperties.returns(false);
            genericUtilityServiceStub.findByProperties.returns(null);

            const result = service.isFollowed({ channel_id: 15 });

            expect(result).to.be.false;
            sinonExpect.calledOnce(genericUtilityServiceStub.hasOwnProperties);
            sinonExpect.calledOnce(genericUtilityServiceStub.findByProperties);
        });

        it('should return false when no bookmark with matching provider information is found', () => {

            genericUtilityServiceStub.hasOwnProperties.returns(true);
            genericUtilityServiceStub.findByProperties.returns(null);

            const result = service.isFollowed({});

            expect(result).to.be.false;
            sinonExpect.calledOnce(genericUtilityServiceStub.hasOwnProperties);
            sinonExpect.calledOnce(genericUtilityServiceStub.findByProperties);
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

            genericUtilityServiceStub.findByProperties.returns({ id: 0 });
        });

        it('should use bookmark http service to delete bookmark', () => {

            const expected = 5;
            genericUtilityServiceStub.findByProperties.returns({ id: expected });

            service.unfollow({});
            $rootScope.$apply();

            sinonExpect.calledOnce(genericUtilityServiceStub.findByProperties);
            sinonExpect.calledOnce(bookmarkHttpServiceStub.deleteBookmark);
            sinonExpect.calledWith(bookmarkHttpServiceStub.deleteBookmark, expected);
        });

        it('should remove bookmark from cache when successfully deleted bookmark', () => {

            service.bookmarks = [{ id: 1 }, { id: 4 }, { id: 7 }];

            const index = 1;
            const bookmark = service.bookmarks[index];
            const expected = excludeIndex(service.bookmarks, index);
            genericUtilityServiceStub.findByProperties.returns(bookmark);

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
            genericUtilityServiceStub.findByProperties.returns({ id: expected[1].id });

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
