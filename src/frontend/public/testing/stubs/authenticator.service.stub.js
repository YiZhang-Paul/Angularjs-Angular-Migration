import { toNg1Mock } from './mock-converter-ng1';

export function mockAuthenticatorService() {

    const mock = {

        setupMock: () => { },
        defaultOptions: null
    }

    mock.setupMock = () => {

        mock.defaultOptions = { headers: { Authorization: 'bearer xxx.xxxx.xxx' } };
    }

    return mock;
}

export function mockAuthenticatorServiceNg1(module, inject) {

    const mock = mockAuthenticatorService();
    const name = 'authenticatorService';

    return toNg1Mock(mock, name, module, inject);
}
