import CommonModule from '../common.module';

const mockModule = angular.mock.module;

context('top navigation bar component unit test', () => {

    let $rootScope;
    let componentElement;

    beforeEach(mockModule(CommonModule));
    beforeEach(mockModule('component-templates'));

    beforeEach('general test setup', inject($injector => {

        const $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        componentElement = $compile('<top-navbar></top-navbar>')($rootScope);

        $rootScope.$apply();
    }));

    it('should resolve', () => {

        expect(componentElement.html()).is.not.empty;
    });
});
