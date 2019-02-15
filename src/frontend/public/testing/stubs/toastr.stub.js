import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockToastr() {

    const mock = {

        setupMock: () => { },
        success: stub(),
        error: stub()
    };

    return mock;
}

export function mockToastrNg1(module, inject) {

    const mock = mockToastr();
    const name = 'toastr';

    return toNg1Mock(mock, name, module, inject);
}
