import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockViewHistoryHttpService() {

    const mock = {

        setupMock: () => mock,
        getHistories: stub(),
        addHistory: stub(),
        deleteHistory: stub(),
        deleteHistories: stub()
    };

    mock.setupMock = (promise = Promise) => {

        mock.getHistories.returns(promise.resolve([]));
        mock.addHistory.returns(promise.resolve({}));
        mock.deleteHistory.returns(promise.resolve({}));
        mock.deleteHistories.returns(promise.resolve({}));

        return mock;
    };

    return mock.setupMock();
}

export function mockViewHistoryHttpServiceNg1(module, inject) {

    const mock = mockViewHistoryHttpService();
    const name = 'viewHistoryHttpService';

    return toNg1Mock(mock, name, module, inject);
}
