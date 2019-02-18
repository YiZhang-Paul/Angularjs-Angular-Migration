import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stub$state() {

    const stubbed = {

        setupStub: () => stubbed,
        go: stub()
    };

    return stubbed.setupStub();
}

export function stub$stateNg1(module, inject) {

    const stubbed = stub$state();
    const name = '$state';

    return toNg1Stub(stubbed, name, module, inject);
}
