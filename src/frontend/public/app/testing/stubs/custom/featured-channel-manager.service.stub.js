import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubFeaturedChannelManagerService() {

    const stubbed = {

        setupStub: () => stubbed,
        getFeaturedChannels: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.getFeaturedChannels.returns(promise.resolve([]));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubFeaturedChannelManagerServiceNg1(module, inject) {

    const stubbed = stubFeaturedChannelManagerService();
    const name = 'featuredChannelManagerService';

    return toNg1Stub(stubbed, name, module, inject);
}
