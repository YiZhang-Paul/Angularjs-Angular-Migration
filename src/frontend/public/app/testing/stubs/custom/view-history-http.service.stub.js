import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubViewHistoryHttpService() {

    const stubbed = {

        setupStub: () => stubbed,
        getHistories: stub(),
        addHistory: stub(),
        deleteHistory: stub(),
        deleteHistories: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.getHistories.returns(promise.resolve([]));
        stubbed.addHistory.returns(promise.resolve({}));
        stubbed.deleteHistory.returns(promise.resolve({}));
        stubbed.deleteHistories.returns(promise.resolve({}));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubViewHistoryHttpServiceNg1(module, inject) {

    const stubbed = stubViewHistoryHttpService();
    const name = 'viewHistoryHttpService';

    return toNg1Stub(stubbed, name, module, inject);
}
