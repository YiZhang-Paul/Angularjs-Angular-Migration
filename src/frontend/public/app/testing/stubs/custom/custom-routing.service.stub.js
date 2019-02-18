import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubCustomRoutingService() {

    const stubbed = {

        setupStub: () => stubbed,
        toChannelsView: stub()
    };

    return stubbed.setupStub();
}

export function stubCustomRoutingServiceNg1(module, inject) {

    const stubbed = stubCustomRoutingService();
    const name = 'customRoutingService';

    return toNg1Stub(stubbed, name, module, inject);
}
