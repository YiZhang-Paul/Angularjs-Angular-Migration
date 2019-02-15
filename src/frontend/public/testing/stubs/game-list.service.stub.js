import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockGameListService() {

    const mock = {

        setupMock: () => { },
        cacheGames: stub()
    };

    return mock;
}

export function mockGameListServiceNg1(module, inject) {

    const mock = mockGameListService();
    const name = 'gameListService';

    return toNg1Mock(mock, name, module, inject);
}
