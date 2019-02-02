import ComponentsModule from '../components.module';

import { excludeIndex } from '../../shared/utilities/utilities';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('bookmark component unit test', () => {

    let getBookmarksStub;
    let unfollowStub;
    let $broadcastStub;

    let q;
    let scope;
    let controller;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock bookmark service', mockModule($provide => {

        getBookmarksStub = stub();
        unfollowStub = stub();

        $provide.service('bookmarkService', () => ({

            getBookmarks: getBookmarksStub,
            unfollow: unfollowStub
        }));
    }));

    beforeEach('test setup', inject(($injector, $controller) => {

        q = $injector.get('$q');
        scope = $injector.get('$rootScope').$new();
        controller = $controller('BookmarkController', { $rootScope: scope });

        $broadcastStub = stub(scope, '$broadcast').callThrough();
    }));

    it('should resolve', () => {

        expect(controller).is.not.null;
    });

    describe('$onInit()', () => {

        it('should use bookmark service to fetch bookmarks', () => {

            getBookmarksStub.returns(q.resolve([]));

            controller.$onInit();
            scope.$apply();

            sinonExpect.calledOnce(getBookmarksStub);
        });

        it('should load bookmarks on initialization', () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            getBookmarksStub.returns(q.resolve(expected));

            controller.$onInit();
            scope.$apply();

            expect(controller.bookmarks).is.not.empty;
            expect(controller.bookmarks).to.deep.equal(expected);
        });

        it('should default to empty collection when load bookmarks failed', () => {

            getBookmarksStub.returns(q.reject(new Error()));

            controller.$onInit();
            scope.$apply();

            expect(Array.isArray(controller.bookmarks)).to.be.true;
            expect(controller.bookmarks).to.be.empty;
        });
    });

    describe('unfollow()', () => {

        beforeEach('unfollow() test setup', () => {

            controller.bookmarks = [{ id: 1 }, { id: 4 }, { id: 7 }];
        });

        it('should use bookmark service to delete bookmark', () => {

            const expected = { id: 5 };
            unfollowStub.returns(q.resolve({}));

            controller.unfollow(expected);
            scope.$apply();

            sinonExpect.calledOnce(unfollowStub);
            sinonExpect.calledWith(unfollowStub, expected);
        });

        it('should remove bookmark from cache when successfully unfollowed', () => {

            const index = 1;
            const bookmark = controller.bookmarks[index];
            const expected = excludeIndex(controller.bookmarks, index);
            unfollowStub.returns(q.resolve({}));

            controller.unfollow(bookmark);
            scope.$apply();

            expect(controller.bookmarks).is.not.empty;
            expect(controller.bookmarks).to.deep.equal(expected);
        });

        it('should raise event when successfully unfollowed', () => {

            const bookmark = controller.bookmarks[1];
            unfollowStub.returns(q.resolve({}));

            controller.unfollow(bookmark);
            scope.$apply();

            expect(bookmark).is.not.undefined;
            sinonExpect.calledOnce($broadcastStub);
            sinonExpect.calledWith($broadcastStub, 'unfollowedChannel');
        });

        it('should not remove bookmark from cache when failed to unfollow', () => {

            const expected = controller.bookmarks.slice();
            unfollowStub.returns(q.reject(new Error()));

            controller.unfollow({});
            scope.$apply();

            expect(controller.bookmarks).is.not.empty;
            expect(controller.bookmarks).to.deep.equal(expected);
        });

        it('should not raise event when failed to unfollow', () => {

            unfollowStub.returns(q.reject(new Error()));

            controller.unfollow({});
            scope.$apply();

            sinonExpect.notCalled($broadcastStub);
        });
    });
});
