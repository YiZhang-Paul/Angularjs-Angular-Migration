import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubToastr() {

    const stubbed = {

        setupStub: () => stubbed,
        success: stub(),
        error: stub()
    };

    return stubbed.setupStub();
}

export function stubToastrNg1(module, inject) {

    const stubbed = stubToastr();
    const name = 'toastr';

    return toNg1Stub(stubbed, name, module, inject);
}
