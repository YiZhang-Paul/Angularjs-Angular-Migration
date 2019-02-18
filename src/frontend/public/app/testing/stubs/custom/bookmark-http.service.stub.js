import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubBookmarkHttpService() {

    const stubbed = {

        setupStub: () => stubbed,
        getBookmarks: stub(),
        addBookmark: stub(),
        deleteBookmark: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.getBookmarks.returns(promise.resolve([]));
        stubbed.addBookmark.returns(promise.resolve({}));
        stubbed.deleteBookmark.returns(promise.resolve({}));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubBookmarkHttpServiceNg1(module, inject) {

    const stubbed = stubBookmarkHttpService();
    const name = 'bookmarkHttpService';

    return toNg1Stub(stubbed, name, module, inject);
}
