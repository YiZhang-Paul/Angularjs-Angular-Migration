import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockMdPanelRef() {

    const mock = {

        setupMock: () => { },
        close: stub(),
        destroy: stub()
    };

    mock.setupMock = (promise = Promise) => {

        mock.close.returns(promise.resolve({}));
        mock.destroy.returns(promise.resolve({}));
    };

    return mock;
}

export function mockMdPanelRefNg1(module, inject) {

    const mock = mockMdPanelRef();
    const name = 'mdPanelRef';

    return toNg1Mock(mock, name, module, inject);
}
