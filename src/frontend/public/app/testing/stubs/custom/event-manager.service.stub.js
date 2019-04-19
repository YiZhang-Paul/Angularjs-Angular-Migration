import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubEventManagerService() {

    const stubbed = {

        setupStub: () => stubbed,
        emit: stub(),
        subscribe: stub()
    };

    return stubbed.setupStub();
}

export function stubEventManagerServiceNg1(module, inject) {

    const stubbed = stubEventManagerService();
    const name = 'eventManagerService';

    return toNg1Stub(stubbed, name, module, inject);
}
