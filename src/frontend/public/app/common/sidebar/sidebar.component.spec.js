import CommonModule from '../common.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('sidebar component unit test', () => {

    let q;
    let scope;
    let component;

    let getBookmarksStub;
    let getHistoriesStub;

    beforeEach(mockModule(CommonModule));

    beforeEach('mock sidebar service', mockModule($provide => {

        getBookmarksStub = stub();
        getHistoriesStub = stub();

        $provide.service('sidebarService', () => ({

            getBookmarks: getBookmarksStub,
            getHistories: getHistoriesStub
        }));
    }));

    beforeEach('test setup', inject(($injector, $componentController) => {

        q = $injector.get('$q');
        scope = $injector.get('$rootScope').$new();
        component = $componentController('sidebar', { $rootScope: scope });
    }));

    it('should resolve', () => {

        expect(component).is.not.null;
    });
});
