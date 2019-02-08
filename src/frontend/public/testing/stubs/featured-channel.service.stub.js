const stub = sinon.stub;
const name = 'featuredChannelService';

export function mockFeaturedChannelService(module, inject) {

    const mock = { initializeMock: null };

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.initializeMock = () => inject($injector => {

        const $q = $injector.get('$q');
        mock.getFeaturedChannels = stub().returns($q.resolve([]));
    });

    return mock;
}
