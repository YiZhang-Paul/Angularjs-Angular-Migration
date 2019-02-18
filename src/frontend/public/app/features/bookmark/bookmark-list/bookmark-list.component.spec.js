import BookmarkModule from '../bookmark.module.ajs';

import { stubBookmarkManagerServiceNg1 } from '../../../testing/stubs/custom/bookmark-manager.service.stub';

const module = angular.mock.module;
const sinonExpect = sinon.assert;

context('bookmark list component unit test', () => {

    const tag = '<bookmark-list></bookmark-list>';

    let $q;
    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let bookmarkManagerStub;

    beforeEach(module(BookmarkModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        bookmarkManagerStub = stubBookmarkManagerServiceNg1(module, inject);

        bookmarkManagerStub.setupStub();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('bookmarkList');
    }));

    it('should resolve', () => {

        componentElement = $compile(tag)($rootScope);
        $rootScope.$apply();

        expect(component).is.not.null;
        expect(componentElement.html()).is.not.empty;
    });

    describe('bookmarks', () => {

        it('should reference bookmark manager service cache', () => {

            const expected = [{ id: 1 }, { id: 4 }];
            bookmarkManagerStub.bookmarks = expected;

            expect(component.bookmarks).to.deep.equal(expected);
        });
    });

    describe('$onInit()', () => {

        it('should use bookmark manager service to cache bookmarks on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkManagerStub.cacheBookmarks);
        });
    });

    describe('unfollow()', () => {

        it('should use bookmark manager service to delete bookmark', () => {

            const expected = { id: 5 };

            component.unfollow(expected);
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkManagerStub.unfollow);
            sinonExpect.calledWith(bookmarkManagerStub.unfollow, expected);
        });

        it('should not throw error when failed to delete bookmark', () => {

            bookmarkManagerStub.unfollow.returns($q.reject(new Error()));

            component.unfollow({});
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkManagerStub.unfollow);
        });
    });
});
