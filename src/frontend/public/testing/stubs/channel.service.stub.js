import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockChannelService() {

    const mock = {

        setupMock: () => { },
        getChannelsByGameId: stub(),
        refreshChannels: stub(),
        isFollowed: stub(),
        follow: stub(),
        unfollow: stub()
    };

    mock.setupMock = (promise = Promise) => {

        mock.getChannelsByGameId.returns(promise.resolve([]));
        mock.isFollowed.returns(true);
        mock.follow.returns(promise.resolve({}));
        mock.unfollow.returns(promise.resolve({}));
    };

    return mock;
}

export function mockChannelServiceNg1(module, inject) {

    const mock = mockChannelService();
    const name = 'channelService';

    return toNg1Mock(mock, name, module, inject);
}
