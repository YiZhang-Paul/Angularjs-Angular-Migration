import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubAuthenticatorService() {

    const stubbed = {

        setupStub: () => stubbed,
        defaultOptions: null,
        isAuthenticated: null,
        requestToken: stub(),
        clearToken: stub()
    }

    stubbed.setupStub = (promise = Promise) => {

        stubbed.defaultOptions = { headers: { Authorization: 'bearer xxx.xxxx.xxx' } };
        stubbed.isAuthenticated = true;
        stubbed.requestToken.returns(promise.resolve({}));

        return stubbed;
    }

    return stubbed.setupStub();
}

export function stubAuthenticatorServiceNg1(module, inject) {

    const stubbed = stubAuthenticatorService();
    const name = 'authenticatorService';

    return toNg1Stub(stubbed, name, module, inject);
}
