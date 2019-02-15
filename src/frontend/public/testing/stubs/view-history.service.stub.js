import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockViewHistoryService() {

    const mock = {

        setupMock: () => { },
        getHistories: stub(),
        cacheHistories: stub(),
        addHistory: stub(),
        deleteHistory: stub(),
        showClearHistoriesDialog: stub(),
        clearHistories: stub()
    };

    mock.setupMock = (promise = Promise) => {

        mock.getHistories.returns(promise.resolve([]));
        mock.cacheHistories.returns(promise.resolve({}));
        mock.addHistory.returns(promise.resolve({}));
        mock.deleteHistory.returns(promise.resolve({}));
        mock.showClearHistoriesDialog.returns(promise.resolve({}));
        mock.clearHistories.returns(promise.resolve({}));
    };

    return mock;
}

export function mockViewHistoryServiceNg1(module, inject) {

    const mock = mockViewHistoryService();
    const name = 'viewHistoryService';

    return toNg1Mock(mock, name, module, inject);
}
