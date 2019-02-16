import SharedModule from '../../../shared.module.ajs';

import { stubMdPanelRefNg1 } from '../../../../testing/stubs/built-in/md-panel-ref.stub';

const module = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('login panel component unit test', () => {

    const tag = '<login-panel></login-panel>';

    let $q;
    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let mdPanelRefStub;

    beforeEach(module(SharedModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        mdPanelRefStub = stubMdPanelRefNg1(module, inject);

        mdPanelRefStub.setupStub();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('loginPanel');

        component.loginCallback = stub().returns($q.resolve({}));
    }));

    it('should resolve', () => {

        componentElement = $compile(tag)($rootScope);
        $rootScope.$apply();

        expect(component).is.not.null;
        expect(componentElement.html()).is.not.empty;
    });

    describe('onLogin()', () => {

        it('should invoke login callback with user credentials', () => {

            const expected = { username: 'username_1', password: 'password_1' };
            component.username = expected.username;
            component.password = expected.password;

            component.onLogin();
            $rootScope.$apply();

            sinonExpect.calledOnce(component.loginCallback);
            sinonExpect.calledWith(component.loginCallback, expected);
        });

        it('should close panel on successful login', () => {

            component.onLogin();
            $rootScope.$apply();

            sinonExpect.calledOnce(mdPanelRefStub.close);
        });

        it('should not close panel on login failure', () => {

            component.loginCallback.returns($q.reject(new Error()));

            component.onLogin();
            $rootScope.$apply();

            sinonExpect.notCalled(mdPanelRefStub.close);
        });

        it('should destroy panel on successful login', () => {

            component.onLogin();
            $rootScope.$apply();

            sinonExpect.calledOnce(mdPanelRefStub.destroy);
        });

        it('should not destroy panel on login failure', () => {

            component.loginCallback.returns($q.reject(new Error()));

            component.onLogin();
            $rootScope.$apply();

            sinonExpect.notCalled(mdPanelRefStub.destroy);
        });

        it('should indicate login error on login failure', () => {

            component.loginCallback.returns($q.reject(new Error()));

            component.onLogin();
            $rootScope.$apply();

            expect(component.noError).to.be.false;
        });
    });

    describe('onKeyup()', () => {

        it('should login when user hits enter key', () => {

            const event = { keyCode: 13 };

            component.onKeyup(event);

            sinonExpect.calledOnce(component.loginCallback);
        });

        it('should not login when user hits other keys', () => {

            const event = { keyCode: 97 };

            component.onKeyup(event);

            sinonExpect.notCalled(component.loginCallback);
        });
    });
});
