import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubChannelHttpService() {

    const stubbed = {

        setupStub: () => stubbed,
        getChannels: stub(),
        getChannelsByGameId: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.getChannels.returns(promise.resolve([]));
        stubbed.getChannelsByGameId.returns(promise.resolve([]));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubChannelHttpServiceNg1(module, inject) {

    const stubbed = stubChannelHttpService();
    const name = 'channelHttpService';

    return toNg1Stub(stubbed, name, module, inject);
}
