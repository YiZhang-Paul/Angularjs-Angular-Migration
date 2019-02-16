import BookmarkModule from '../bookmark.module.ajs';

const module = angular.mock.module;

context('bookmark card component unit test', () => {

    const tag = '<bookmark-card></bookmark-card>';

    let $compile;
    let $rootScope;
    let componentElement;

    beforeEach(module(BookmarkModule));
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
