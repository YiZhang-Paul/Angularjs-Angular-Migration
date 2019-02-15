import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockGameListService() {

    const mock = {

        setupMock: () => mock,
        cacheGames: stub()
    };

    return mock.setupMock();
}

export function mockGameListServiceNg1(module, inject) {

    const mock = mockGameListService();
    const name = 'gameListService';

    return toNg1Mock(mock, name, module, inject);
}
