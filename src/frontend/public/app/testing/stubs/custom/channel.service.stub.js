import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubChannelService() {

    const stubbed = {

        setupStub: () => stubbed,
        refreshChannels: stub(),
        loadFeaturedChannels: stub(),
        loadGameChannels: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.loadFeaturedChannels.returns(promise.resolve({}));
        stubbed.loadGameChannels.returns(promise.resolve({}));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubChannelServiceNg1(module, inject) {

    const stubbed = stubChannelService();
    const name = 'channelService';

    return toNg1Stub(stubbed, name, module, inject);
}
