const stub = sinon.stub;
const name = 'gameHttpService';

export function mockGameHttpService(module, inject) {

    const mock = { initializeMock: null };

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.initializeMock = () => inject($injector => {

        const $q = $injector.get('$q');
        mock.getGame = stub().returns($q.resolve({}));
        mock.getGameByName = stub().returns($q.resolve({}));
        mock.getGames = stub().returns($q.resolve([]));
    });

    return mock;
}
