import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockSidebarService() {

    const mock = {

        setupMock: () => mock,
        getBookmarks: stub(),
        getFeaturedChannels: stub(),
        getHistories: stub()
    };

    mock.setupMock = (promise = Promise) => {

        mock.getBookmarks.returns(promise.resolve([]));
        mock.getFeaturedChannels.returns(promise.resolve([]));
        mock.getHistories.returns(promise.resolve([]));

        return mock;
    };

    return mock.setupMock();
}

export function mockSidebarServiceNg1(module, inject) {

    const mock = mockSidebarService();
    const name = 'sidebarService';

    return toNg1Mock(mock, name, module, inject);
}
