import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mock$state() {

    const mock = {

        setupMock: () => mock,
        go: stub()
    };

    return mock.setupMock();
}

export function mock$stateNg1(module, inject) {

    const mock = mock$state();
    const name = '$state';

    return toNg1Mock(mock, name, module, inject);
}
