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

    let authenticatorServiceStub;
    let bookmarkManagerServiceStub;
    let viewHistoryManagerServiceStub;

    beforeEach(module(AppModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        stubComponentNg1(module, 'sidebar');
        stubComponentNg1(module, 'topNavbar');
        stubComponentNg1(module, 'gameList');

        authenticatorServiceStub = stubAuthenticatorServiceNg1(module, inject);
        bookmarkManagerServiceStub = stubBookmarkManagerServiceNg1(module, inject);
        viewHistoryManagerServiceStub = stubViewHistoryManagerServiceNg1(module, inject);

        authenticatorServiceStub.setupStub();
        bookmarkManagerServiceStub.setupStub();
        viewHistoryManagerServiceStub.setupStub();
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

            sinonExpect.calledOnce(bookmarkManagerServiceStub.cacheBookmarks);
        });

        it('should not cache bookmarks on initialization when user is not authenticated', () => {

            authenticatorServiceStub.isAuthenticated = false;

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.notCalled(bookmarkManagerServiceStub.cacheBookmarks);
        });

        it('should cache view histories on initialization when user is authenticated', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryManagerServiceStub.cacheHistories);
        });

        it('should not cache view histories on initialization when user is not authenticated', () => {

            authenticatorServiceStub.isAuthenticated = false;

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.notCalled(viewHistoryManagerServiceStub.cacheHistories);
        });
    });
});
