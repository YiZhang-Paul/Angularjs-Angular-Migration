import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubBookmarkManagerService() {

    const stubbed = {

        setupStub: () => stubbed,
        cacheBookmarks: stub(),
        isFollowed: stub(),
        follow: stub(),
        unfollow: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.cacheBookmarks.returns(promise.resolve({}));
        stubbed.isFollowed.returns(true);
        stubbed.follow.returns(promise.resolve({}));
        stubbed.unfollow.returns(promise.resolve({}));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubBookmarkManagerServiceNg1(module, inject) {

    const stubbed = stubBookmarkManagerService();
    const name = 'bookmarkManagerService';

    return toNg1Stub(stubbed, name, module, inject);
}
