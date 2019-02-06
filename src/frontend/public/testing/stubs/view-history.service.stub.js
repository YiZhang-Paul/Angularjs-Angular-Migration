const stub = sinon.stub;
const name = 'viewHistoryService';

export function mockViewHistoryService(module, inject) {

    const mock = { initializeMock: null };

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.initializeMock = () => inject($injector => {

        const $q = $injector.get('$q');
        mock.getHistories = stub().returns($q.resolve([]));
        mock.cacheHistories = stub().returns($q.resolve({}));
        mock.addHistory = stub().returns($q.resolve({}));
        mock.deleteHistory = stub().returns($q.resolve({}));
        mock.showClearHistoriesDialog = stub().returns($q.resolve({}));
        mock.clearHistories = stub().returns($q.resolve({}));
    });

    return mock;
}
