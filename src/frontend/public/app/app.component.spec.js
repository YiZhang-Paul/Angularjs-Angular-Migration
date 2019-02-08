import AppModule from './app.module';

import { mockComponent } from '../testing/stubs/mockComponent.stub';
import { mockBookmarkService } from '../testing/stubs/bookmark.service.stub';

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

        mockComponent(mockModule, 'sidebar');
        mockComponent(mockModule, 'topNavbar');
        mockComponent(mockModule, 'gameList');
        bookmarkServiceStub = mockBookmarkService(mockModule, inject);

        bookmarkServiceStub.initializeMock();
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
