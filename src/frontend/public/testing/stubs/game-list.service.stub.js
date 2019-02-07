const stub = sinon.stub;
const name = 'gameListService';

export function mockGameListService(module) {

    const mock = { initializeMock: null };

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.cacheGames = stub();

    return mock;
}
