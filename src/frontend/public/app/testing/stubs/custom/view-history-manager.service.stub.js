import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubViewHistoryManagerService() {

    const stubbed = {

        setupStub: () => stubbed,
        getHistories: stub(),
        cacheHistories: stub(),
        addHistory: stub(),
        deleteHistory: stub(),
        showClearHistoriesDialog: stub(),
        clearHistories: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.getHistories.returns(promise.resolve([]));
        stubbed.cacheHistories.returns(promise.resolve({}));
        stubbed.addHistory.returns(promise.resolve({}));
        stubbed.deleteHistory.returns(promise.resolve({}));
        stubbed.showClearHistoriesDialog.returns(promise.resolve({}));
        stubbed.clearHistories.returns(promise.resolve({}));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubViewHistoryManagerServiceNg1(module, inject) {

    const stubbed = stubViewHistoryManagerService();
    const name = 'viewHistoryManagerService';

    return toNg1Stub(stubbed, name, module, inject);
}
