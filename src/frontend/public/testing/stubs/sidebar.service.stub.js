const stub = sinon.stub;
const name = 'sidebarService';

export function mockSidebarService(module, inject) {

    const mock = { initializeMock: null };

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.initializeMock = () => inject($injector => {

        const $q = $injector.get('$q');
        mock.getBookmarks = stub().returns($q.resolve([]));
        mock.getFeaturedChannels = stub().returns($q.resolve([]));
        mock.getHistories = stub().returns($q.resolve([]));
    });

    return mock;
}
