import ComponentsModule from '../../components.module';

const mockModule = angular.mock.module;

context('channel badge component unit test', () => {

    let $rootScope;
    let componentElement;

    beforeEach(mockModule(ComponentsModule));
    beforeEach(mockModule('component-templates'));

    beforeEach('general test setup', inject($injector => {

        const $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        componentElement = $compile('<channel-badge></channel-badge>')($rootScope);

        $rootScope.$apply();
    }));

    it('should resolve', () => {

        expect(componentElement.html()).is.not.empty;
    });
});
