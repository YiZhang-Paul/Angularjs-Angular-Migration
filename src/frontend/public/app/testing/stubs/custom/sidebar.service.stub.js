import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubSidebarService() {

    const stubbed = {

        setupStub: () => stubbed,
        getBookmarks: stub(),
        getFeaturedChannels: stub(),
        getHistories: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.getBookmarks.returns(promise.resolve([]));
        stubbed.getFeaturedChannels.returns(promise.resolve([]));
        stubbed.getHistories.returns(promise.resolve([]));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubSidebarServiceNg1(module, inject) {

    const stubbed = stubSidebarService();
    const name = 'sidebarService';

    return toNg1Stub(stubbed, name, module, inject);
}
