import ComponentsModule from '../components.module';

import { mockBookmarkService } from '../../../testing/stubs/bookmark.service.stub';

const mockModule = angular.mock.module;
const sinonExpect = sinon.assert;

context('bookmark component unit test', () => {

    let $q;
    let $rootScope;
    let component;

    let bookmarkServiceStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mocks setup', () => {

        bookmarkServiceStub = mockBookmarkService(mockModule, inject);

        bookmarkServiceStub.initializeMock();
    });

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

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkServiceStub.cacheBookmarks);
        });
    });

    describe('unfollow()', () => {

        it('should use bookmark service to delete bookmark', () => {

            const expected = { id: 5 };

            component.unfollow(expected);
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkServiceStub.unfollow);
            sinonExpect.calledWith(bookmarkServiceStub.unfollow, expected);
        });

        it('should not throw error when failed to delete bookmark', () => {

            bookmarkServiceStub.unfollow.returns($q.reject(new Error()));

            component.unfollow({});
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkServiceStub.unfollow);
        });
    });
});
