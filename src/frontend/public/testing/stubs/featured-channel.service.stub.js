import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockFeaturedChannelService() {

    const mock = {

        setupMock: () => { },
        getFeaturedChannels: stub()
    };

    mock.setupMock = (promise = Promise) => {

        mock.getFeaturedChannels.returns(promise.resolve([]));
    };

    return mock;
}

export function mockFeaturedChannelServiceNg1(module, inject) {

    const mock = mockFeaturedChannelService();
    const name = 'featuredChannelService';

    return toNg1Mock(mock, name, module, inject);
}
