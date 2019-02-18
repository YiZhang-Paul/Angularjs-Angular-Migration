import SharedModule from '../../../shared/shared.module.ajs';
import ViewHistoryModule from '../view-history.module.ajs';

const module = angular.mock.module;

context('view history card component unit test', () => {

    const tag = '<view-history-card></view-history-card>';

    let $compile;
    let $rootScope;
    let componentElement;

    beforeEach(module(SharedModule));
    beforeEach(module(ViewHistoryModule));
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
