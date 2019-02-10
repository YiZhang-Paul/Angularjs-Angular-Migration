import CommonModule from '../common.module';

import { mockAuthenticatorService } from '../../../testing/stubs/authenticator.service.stub';

const mockModule = angular.mock.module;

context('top navigation bar component unit test', () => {

    const tag = '<top-navbar></top-navbar>';

    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let authenticatorServiceStub;

    beforeEach(mockModule(CommonModule));
    beforeEach(mockModule('component-templates'));

    beforeEach('mocks setup', () => {

        authenticatorServiceStub = mockAuthenticatorService(mockModule);
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('topNavbar');
    }));

    it('should resolve', () => {

        componentElement = $compile(tag)($rootScope);
        $rootScope.$apply();

        expect(component).is.not.null;
        expect(componentElement.html()).is.not.empty;
    });

    describe('isAuthenticated', () => {

        it('should use authenticator service to check user authentication status', () => {

            authenticatorServiceStub.isAuthenticated = true;

            expect(component.isAuthenticated).to.be.true;

            authenticatorServiceStub.isAuthenticated = false;

            expect(component.isAuthenticated).to.be.false;
        });
    });
});
