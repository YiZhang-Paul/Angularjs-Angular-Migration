import SharedModule from '../../../shared/shared.module.ajs';
import GameModule from '../game.module.ajs';

const module = angular.mock.module;

context('game card component unit test', () => {

    const tag = '<game-card></game-card>';

    let $compile;
    let $rootScope;
    let componentElement;

    beforeEach(module(SharedModule));
    beforeEach(module(GameModule));
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
