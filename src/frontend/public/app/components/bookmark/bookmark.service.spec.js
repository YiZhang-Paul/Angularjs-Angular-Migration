import SharedModule from '../../shared/shared.module';
import ComponentsModule from '../components.module';

import { excludeIndex } from '../../shared/services/generic-utility.service';

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
    let hasOwnPropertiesStub;
    let findByPropertiesStub;
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

    beforeEach('mock generic utility service setup', mockModule($provide => {

        hasOwnPropertiesStub = stub();
        findByPropertiesStub = stub();

        $provide.service('genericUtilityService', () => ({

            hasOwnProperties: hasOwnPropertiesStub,
            findByProperties: findByPropertiesStub
        }));
    }));

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('bookmarkService');

        $broadcastStub = stub($rootScope, '$broadcast').callThrough();
    }));

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

            hasOwnPropertiesStub.returns(false);
            findByPropertiesStub.returns({ id: 5 });
            const data = { channel_id: 15 };

            const result = service.isFollowed(data);

            expect(result).to.be.true;
            sinonExpect.calledOnce(hasOwnPropertiesStub);
            sinonExpect.calledOnce(findByPropertiesStub);
        });

        it('should return true when bookmark with matching provider information is found', () => {

            hasOwnPropertiesStub.returns(true);
            findByPropertiesStub.returns({ id: 5 });

            const result = service.isFollowed({});

            expect(result).to.be.true;
            sinonExpect.calledOnce(hasOwnPropertiesStub);
            sinonExpect.calledOnce(findByPropertiesStub);
        });

        it('should return false when input data is invalid', () => {

            hasOwnPropertiesStub.returns(false);

            const result = service.isFollowed({});

            expect(result).to.be.false;
            sinonExpect.calledOnce(hasOwnPropertiesStub);
            sinonExpect.notCalled(findByPropertiesStub);
        });

        it('should return false when no bookmark with matching channel id is found', () => {

            hasOwnPropertiesStub.returns(false);
            findByPropertiesStub.returns(null);

            const result = service.isFollowed({ channel_id: 15 });

            expect(result).to.be.false;
            sinonExpect.calledOnce(hasOwnPropertiesStub);
            sinonExpect.calledOnce(findByPropertiesStub);
        });

        it('should return false when no bookmark with matching provider information is found', () => {

            hasOwnPropertiesStub.returns(true);
            findByPropertiesStub.returns(null);

            const result = service.isFollowed({});

            expect(result).to.be.false;
            sinonExpect.calledOnce(hasOwnPropertiesStub);
            sinonExpect.calledOnce(findByPropertiesStub);
        });
    });

    describe('follow()', () => {
        // TODO: move to top
        beforeEach('follow() test setup', () => {
            // clear $locationChangeStart and $locationChangeSuccess broadcast
            $rootScope.$apply();
            $broadcastStub.resetHistory();
            addBookmarkStub.returns($q.resolve({}));
            getBookmarksStub.returns($q.resolve([]));
        });

        it('should use bookmark http service to add bookmark', () => {

            service.follow({});
            $rootScope.$apply();

            sinonExpect.calledOnce(addBookmarkStub);
        });

        it('should cache bookmarks when added successfully', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            getBookmarksStub.returns($q.resolve(expected));

            service.follow({}).then(() => {

                sinonExpect.calledOnce(getBookmarksStub);
                expect(service.bookmarks).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should raise event when successfully added bookmark', () => {

            service.follow({});
            $rootScope.$apply();

            sinonExpect.calledOnce($broadcastStub);
            sinonExpect.calledWith($broadcastStub, 'followedChannel');
        });

        it('should not cache bookmarks when failed to add bookmark', () => {

            const expected = { status: 400 };
            addBookmarkStub.returns($q.reject(expected));

            service.follow({}).catch(() => null);
            $rootScope.$apply();

            sinonExpect.notCalled(getBookmarksStub);
        });

        it('should not raise event when failed to add bookmark', () => {

            addBookmarkStub.returns($q.reject(new Error()));

            service.follow({}).catch(() => null);
            $rootScope.$apply();

            sinonExpect.notCalled($broadcastStub);
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
            hasOwnPropertiesStub.returns(true);
            findByPropertiesStub.returns({ id: 0 });
        });

        it('should use bookmark http service to delete bookmark', () => {

            const expected = 5;
            findByPropertiesStub.returns({ id: expected });
            deleteBookmarkStub.returns($q.resolve({}));

            service.unfollow({});
            $rootScope.$apply();

            sinonExpect.calledOnce(findByPropertiesStub);
            sinonExpect.calledOnce(deleteBookmarkStub);
            sinonExpect.calledWith(deleteBookmarkStub, expected);
        });

        it('should remove bookmark from cache when successfully deleted bookmark', () => {

            service.bookmarks = [{ id: 1 }, { id: 4 }, { id: 7 }];

            const index = 1;
            const bookmark = service.bookmarks[index];
            const expected = excludeIndex(service.bookmarks, index);
            deleteBookmarkStub.returns($q.resolve({}));
            findByPropertiesStub.returns(bookmark);

            service.unfollow({});
            $rootScope.$apply();

            expect(service.bookmarks).is.not.empty;
            expect(service.bookmarks).to.deep.equal(expected);
        });

        it('should raise event when successfully deleted bookmark', () => {

            deleteBookmarkStub.returns($q.resolve({}));

            service.unfollow({});
            $rootScope.$apply();

            sinonExpect.calledOnce($broadcastStub);
            sinonExpect.calledWith($broadcastStub, 'unfollowedChannel');
        });

        it('should not remove bookmark from cache when failed to delete bookmark', () => {

            service.bookmarks = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.bookmarks.slice();
            deleteBookmarkStub.returns($q.reject(new Error()));
            findByPropertiesStub.returns({ id: expected[1].id });

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
