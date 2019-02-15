import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockAuthenticatorService() {

    const mock = {

        setupMock: () => mock,
        defaultOptions: null,
        requestToken: stub(),
        clearToken: stub()
    }

    mock.setupMock = (promise = Promise) => {

        mock.defaultOptions = { headers: { Authorization: 'bearer xxx.xxxx.xxx' } };
        mock.requestToken.returns(promise.resolve({}));

        return mock;
    }

    return mock.setupMock();
}

export function mockAuthenticatorServiceNg1(module, inject) {

    const mock = mockAuthenticatorService();
    const name = 'authenticatorService';

    return toNg1Mock(mock, name, module, inject);
}
