import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubChannelManagerService() {

    const stubbed = {

        setupStub: () => stubbed,
        getChannelsByGameId: stub(),
        refreshChannels: stub(),
        isFollowed: stub(),
        follow: stub(),
        unfollow: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.getChannelsByGameId.returns(promise.resolve([]));
        stubbed.isFollowed.returns(true);
        stubbed.follow.returns(promise.resolve({}));
        stubbed.unfollow.returns(promise.resolve({}));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubChannelManagerServiceNg1(module, inject) {

    const stubbed = stubChannelManagerService();
    const name = 'channelManagerService';

    return toNg1Stub(stubbed, name, module, inject);
}
