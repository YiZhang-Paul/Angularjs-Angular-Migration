import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockChannelHttpService() {

    const mock = {

        setupMock: () => mock,
        getChannels: stub(),
        getChannelsByGameId: stub()
    };

    mock.setupMock = (promise = Promise) => {

        mock.getChannels.returns(promise.resolve([]));
        mock.getChannelsByGameId.returns(promise.resolve([]));

        return mock;
    };

    return mock.setupMock();
}

export function mockChannelHttpServiceNg1(module, inject) {

    const mock = mockChannelHttpService();
    const name = 'channelHttpService';

    return toNg1Mock(mock, name, module, inject);
}
