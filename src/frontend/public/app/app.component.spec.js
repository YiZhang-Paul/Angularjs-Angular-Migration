import AppModule from './app.module.ajs';

import { stubComponentNg1 } from './testing/stubs/custom/components.stub';
import { stubBookmarkManagerServiceNg1 } from './testing/stubs/custom/bookmark-manager.service.stub';

const module = angular.mock.module;
const sinonExpect = sinon.assert;

context('app component unit test', () => {

    const tag = '<app></app>';

    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let bookmarkManagerServiceStub;

    beforeEach(module(AppModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        stubComponentNg1(module, 'sidebar');
        stubComponentNg1(module, 'topNavbar');
        stubComponentNg1(module, 'gameList');

        bookmarkManagerServiceStub = stubBookmarkManagerServiceNg1(module, inject);

        bookmarkManagerServiceStub.setupStub();
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

        it('should use bookmark manager service to cache bookmarks on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkManagerServiceStub.cacheBookmarks);
        });
    });
});
