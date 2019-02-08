import AppModule from './app.module';

const mockModule = angular.mock.module;

context('app component unit test', () => {

    const tag = '<app></app>';

    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    beforeEach(mockModule(AppModule));
    beforeEach(mockModule('component-templates'));

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
});
