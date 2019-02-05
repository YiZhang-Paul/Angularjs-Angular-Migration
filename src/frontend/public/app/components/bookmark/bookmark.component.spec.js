import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('bookmark component unit test', () => {

    let $q;
    let $rootScope;
    let component;

    let cacheBookmarksStub;
    let unfollowStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock bookmark service setup', mockModule($provide => {

        cacheBookmarksStub = stub();
        unfollowStub = stub();

        $provide.service('bookmarkService', () => ({

            cacheBookmarks: cacheBookmarksStub,
            unfollow: unfollowStub
        }));
    }));

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('bookmark');
    }));

    it('should resolve', () => {

        expect(component).is.not.null;
    });

    describe('bookmarks', () => {

        it('should reference bookmark service cache', () => {

            const expected = [{ id: 1 }, { id: 4 }];
            component.service.bookmarks = expected;

            expect(component.bookmarks).to.deep.equal(expected);
        });
    });

    describe('$onInit()', () => {

        it('should use bookmark service to cache bookmarks on initialization', () => {

            cacheBookmarksStub.returns($q.resolve({}));

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(cacheBookmarksStub);
        });
    });

    describe('unfollow()', () => {

        it('should use bookmark service to delete bookmark', () => {

            const expected = { id: 5 };
            unfollowStub.returns($q.resolve({}));

            component.unfollow(expected);
            $rootScope.$apply();

            sinonExpect.calledOnce(unfollowStub);
            sinonExpect.calledWith(unfollowStub, expected);
        });

        it('should not throw error when failed to delete bookmark', () => {

            unfollowStub.returns($q.reject(new Error()));

            component.unfollow({});
            $rootScope.$apply();

            sinonExpect.calledOnce(unfollowStub);
        });
    });
});
