const stub = sinon.stub;
const name = 'gameService';

export function mockGameService(module) {

    const mock = { initializeMock: null };

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.cacheGames = stub();

    return mock;
}
