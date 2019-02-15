import ComponentsModule from '../components.module.ajs';

import { mockBookmarkServiceNg1 } from '../../../testing/stubs/bookmark.service.stub';

const mockModule = angular.mock.module;
const sinonExpect = sinon.assert;

context('bookmark component unit test', () => {

    const tag = '<bookmark></bookmark>';

    let $q;
    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let bookmarkServiceStub;
    beforeEach(mockModule('component-templates'));

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mocks setup', () => {

        bookmarkServiceStub = mockBookmarkServiceNg1(mockModule, inject);

        bookmarkServiceStub.setupMock();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('bookmark');
    }));

    it('should resolve', () => {

        componentElement = $compile(tag)($rootScope);
        $rootScope.$apply();

        expect(component).is.not.null;
        expect(componentElement.html()).is.not.empty;
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

        it('should register user authenticated event listener', () => {

            component.$onInit();
            $rootScope.$apply();
            bookmarkServiceStub.cacheBookmarks.resetHistory();

            $rootScope.$broadcast('userAuthenticated');

            sinonExpect.calledOnce(bookmarkServiceStub.cacheBookmarks);
        });

        it('should register user logged out event listener', () => {

            component.$onInit();
            $rootScope.$apply();
            bookmarkServiceStub.bookmarks = [{ id: 1 }, { id: 4 }, { id: 7 }];

            $rootScope.$broadcast('userLoggedOut');

            expect(bookmarkServiceStub.bookmarks).to.be.empty;
            expect(component.bookmarks).to.be.empty;
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
