import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubViewHistoryListService() {

    const stubbed = {

        setupStub: () => stubbed,
        showClearHistoriesDialog: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.showClearHistoriesDialog.returns(promise.resolve({}));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubViewHistoryListServiceNg1(module, inject) {

    const stubbed = stubViewHistoryListService();
    const name = 'viewHistoryListService';

    return toNg1Stub(stubbed, name, module, inject);
}
