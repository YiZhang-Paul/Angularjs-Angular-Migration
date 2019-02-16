import SharedModule from '../../../shared.module.ajs';

const module = angular.mock.module;

context('sidebar badge component unit test', () => {

    const tag = '<sidebar-badge></sidebar-badge>';

    let $compile;
    let $rootScope;
    let componentElement;

    beforeEach(module(SharedModule));
    beforeEach(module('component-templates'));

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
