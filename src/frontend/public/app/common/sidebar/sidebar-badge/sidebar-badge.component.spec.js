import CommonModule from '../../common.module';

const mockModule = angular.mock.module;

context('sidebar badge component unit test', () => {

    const tag = '<sidebar-badge></sidebar-badge>';

    let $compile;
    let $rootScope;
    let componentElement;

    beforeEach(mockModule(CommonModule));
    beforeEach(mockModule('component-templates'));

    beforeEach('general test setup', inject($injector => {

        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
    }));

    it('should resolve', () => {

        componentElement = $compile(tag)($rootScope);
        $rootScope.$apply();

        expect(componentElement.html()).is.not.empty;
    });
});
