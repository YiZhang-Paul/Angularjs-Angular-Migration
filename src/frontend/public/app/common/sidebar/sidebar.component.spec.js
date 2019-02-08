import CommonModule from '../common.module';

import { mockToastr } from '../../../testing/stubs/toastr.stub';
import { mockSidebarService } from '../../../testing/stubs/sidebar.service.stub';

const mockModule = angular.mock.module;
const sinonExpect = sinon.assert;

context('sidebar component unit test', () => {

    const tag = '<sidebar></sidebar>';

    let $q;
    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let toastrStub;
    let sidebarServiceStub;

    beforeEach(mockModule(CommonModule));
    beforeEach(mockModule('component-templates'));

    beforeEach('mocks setup', () => {

        toastrStub = mockToastr(mockModule);
        sidebarServiceStub = mockSidebarService(mockModule, inject);

        sidebarServiceStub.initializeMock();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('sidebar');
    }));

    it('should resolve', () => {

        componentElement = $compile(tag)($rootScope);
        $rootScope.$apply();

        expect(component).is.not.null;
        expect(componentElement.html()).is.not.empty;
    });

    describe('$onInit()', () => {

        it('should use sidebar service to fetch bookmark data', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(sidebarServiceStub.getBookmarks);
        });

        it('should load bookmarks on initialization', () => {

            const expected = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
            sidebarServiceStub.getBookmarks.returns($q.resolve(expected));

            component.$onInit();
            $rootScope.$apply();

            const result = component.badges.get('Followed Channels');

            expect(result).to.deep.equal(expected.slice(0, 3));
        });

        it('should use sidebar service to fetch channel data', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(sidebarServiceStub.getFeaturedChannels);
        });

        it('should load featured channels on initialization', () => {

            const expected = [

                { id: 1, provider_game_name: 'name_1', game_name: 'name_1' },
                { id: 2, provider_game_name: 'name_2', game_name: 'name_2' },
                { id: 3, provider_game_name: 'name_3', game_name: 'name_3' },
                { id: 4, provider_game_name: 'name_4', game_name: 'name_4' }
            ];

            sidebarServiceStub.getFeaturedChannels.returns($q.resolve(expected));

            component.$onInit();
            $rootScope.$apply();

            const result = component.badges.get('Featured Channels');

            expect(result).to.deep.equal(expected.slice(0, 3));
        });

        it('should use sidebar service to fetch view history data', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(sidebarServiceStub.getHistories);
        });

        it('should load view histories on initialization', () => {

            const expected = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
            sidebarServiceStub.getHistories.returns($q.resolve(expected));

            component.$onInit();
            $rootScope.$apply();

            const result = component.badges.get('View History');

            expect(result).to.deep.equal(expected.slice(0, 3));
        });

        it('should register followed channel event on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sidebarServiceStub.getBookmarks.reset();
            sidebarServiceStub.getBookmarks.returns($q.resolve([]));

            $rootScope.$broadcast('followedChannel');

            sinonExpect.calledOnce(sidebarServiceStub.getBookmarks);
            sinonExpect.calledOnce(toastrStub.success);
        });

        it('should register unfollowed channel event on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sidebarServiceStub.getBookmarks.reset();
            sidebarServiceStub.getBookmarks.returns($q.resolve([]));

            $rootScope.$broadcast('unfollowedChannel');

            sinonExpect.calledOnce(sidebarServiceStub.getBookmarks);
            sinonExpect.calledOnce(toastrStub.error);
        });

        it('should register view history updated event on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sidebarServiceStub.getHistories.reset();
            sidebarServiceStub.getHistories.returns($q.resolve([]));

            $rootScope.$broadcast('historyUpdated');

            sinonExpect.calledOnce(sidebarServiceStub.getHistories);
        });

        it('should register view history removed event on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sidebarServiceStub.getHistories.reset();
            sidebarServiceStub.getHistories.returns($q.resolve([]));

            $rootScope.$broadcast('historyRemoved');

            sinonExpect.calledOnce(sidebarServiceStub.getHistories);
        });

        it('should register view history cleared event on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sidebarServiceStub.getHistories.reset();
            sidebarServiceStub.getHistories.returns($q.resolve([]));

            $rootScope.$broadcast('historyCleared');

            sinonExpect.calledOnce(sidebarServiceStub.getHistories);
        });
    });
});
