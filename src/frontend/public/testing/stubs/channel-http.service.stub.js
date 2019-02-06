const stub = sinon.stub;
const name = 'channelHttpService';

export function mockChannelHttpService(module, inject) {

    const mock = { initializeMock: null };

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.initializeMock = () => inject($injector => {

        const $q = $injector.get('$q');
        mock.getChannels = stub().returns($q.resolve([]));
        mock.getChannelsByGameId = stub().returns($q.resolve([]));
    });

    return mock;
}
