const stub = sinon.stub;
const name = 'viewHistoryHttpService';

export function mockViewHistoryHttpService(module, inject) {

    const mock = { initializeMock: null };

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.initializeMock = () => inject($injector => {

        const $q = $injector.get('$q');
        mock.getHistories = stub().returns($q.resolve([]));
        mock.addHistory = stub().returns($q.resolve({}));
        mock.deleteHistory = stub().returns($q.resolve({}));
        mock.deleteHistories = stub().returns($q.resolve({}));
    });

    return mock;
}
