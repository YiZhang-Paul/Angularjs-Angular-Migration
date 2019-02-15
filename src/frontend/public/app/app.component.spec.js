import AppModule from './app.module.ajs';

import { mockComponentNg1 } from '../testing/stubs/mock-component.stub';
import { mockBookmarkServiceNg1 } from '../testing/stubs/bookmark.service.stub';

const mockModule = angular.mock.module;
const sinonExpect = sinon.assert;

context('app component unit test', () => {

    const tag = '<app></app>';

    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let bookmarkServiceStub;

    beforeEach(mockModule(AppModule));
    beforeEach(mockModule('component-templates'));

    beforeEach('mocks setup', () => {

        mockComponentNg1(mockModule, 'sidebar');
        mockComponentNg1(mockModule, 'topNavbar');
        mockComponentNg1(mockModule, 'gameList');
        bookmarkServiceStub = mockBookmarkServiceNg1(mockModule, inject);

        bookmarkServiceStub.setupMock();
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

        it('should use bookmark service to cache bookmarks on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkServiceStub.cacheBookmarks);
        });
    });
});
