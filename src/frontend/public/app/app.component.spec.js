import AppModule from './app.module.ajs';

import { stubComponentNg1 } from './testing/stubs/custom/components.stub';
import { stubAuthenticatorServiceNg1 } from './testing/stubs/custom/authenticator.service.stub';
import { stubBookmarkManagerServiceNg1 } from './testing/stubs/custom/bookmark-manager.service.stub';
import { stubViewHistoryManagerServiceNg1 } from './testing/stubs/custom/view-history-manager.service.stub';

const module = angular.mock.module;
const sinonExpect = sinon.assert;

context('app component unit test', () => {

    const tag = '<app></app>';

    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let authenticatorStub;
    let bookmarkManagerStub;
    let viewHistoryManagerStub;

    beforeEach(module(AppModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        stubComponentNg1(module, 'sidebar');
        stubComponentNg1(module, 'topNavbar');
        stubComponentNg1(module, 'gameList');

        authenticatorStub = stubAuthenticatorServiceNg1(module, inject);
        bookmarkManagerStub = stubBookmarkManagerServiceNg1(module, inject);
        viewHistoryManagerStub = stubViewHistoryManagerServiceNg1(module, inject);

        authenticatorStub.setupStub();
        bookmarkManagerStub.setupStub();
        viewHistoryManagerStub.setupStub();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('app');
    }));

    it('should resolve', () => {

        componentElement = $compile(tag)($rootScope);
        $rootScope.$apply();

        expect(component).is.not.null;
        expect(componentElement.html()).is.not.empty;
    });

    describe('$onInit()', () => {

        it('should cache bookmarks on initialization when user is authenticated', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkManagerStub.cacheBookmarks);
        });

        it('should not cache bookmarks on initialization when user is not authenticated', () => {

            authenticatorStub.isAuthenticated = false;

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.notCalled(bookmarkManagerStub.cacheBookmarks);
        });

        it('should cache view histories on initialization when user is authenticated', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryManagerStub.cacheHistories);
        });

        it('should not cache view histories on initialization when user is not authenticated', () => {

            authenticatorStub.isAuthenticated = false;

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.notCalled(viewHistoryManagerStub.cacheHistories);
        });

        it('should register user authenticated event listener', () => {

            component.$onInit();
            $rootScope.$apply();
            bookmarkManagerStub.cacheBookmarks.resetHistory();
            viewHistoryManagerStub.cacheHistories.resetHistory();

            $rootScope.$broadcast('userAuthenticated');

            sinonExpect.calledOnce(bookmarkManagerStub.cacheBookmarks);
            sinonExpect.calledOnce(viewHistoryManagerStub.cacheHistories);
        });

        it('should register user logged out event listener', () => {

            component.$onInit();
            $rootScope.$apply();
            bookmarkManagerStub.bookmarks = [{ id: 1 }, { id: 4 }, { id: 7 }];
            viewHistoryManagerStub.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];

            $rootScope.$broadcast('userLoggedOut');

            expect(bookmarkManagerStub.bookmarks).to.be.empty;
            expect(viewHistoryManagerStub.histories).to.be.empty;
        });
    });
});
