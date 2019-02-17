import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubViewHistoryManagerService() {

    const stubbed = {

        setupStub: () => stubbed,
        cacheHistories: stub(),
        addHistory: stub(),
        deleteHistory: stub(),
        clearHistories: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.cacheHistories.returns(promise.resolve({}));
        stubbed.addHistory.returns(promise.resolve({}));
        stubbed.deleteHistory.returns(promise.resolve({}));
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
