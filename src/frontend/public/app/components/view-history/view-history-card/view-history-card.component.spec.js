import SharedModule from '../../../shared/shared.module.ajs';
import ComponentsModule from '../../components.module.ajs';

const mockModule = angular.mock.module;

context('view history card component unit test', () => {

    const tag = '<view-history-card></view-history-card>';

    let $compile;
    let $rootScope;
    let componentElement;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(ComponentsModule));
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
