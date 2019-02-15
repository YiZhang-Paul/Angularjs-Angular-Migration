import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockBookmarkService() {

    const mock = {

        setupMock: () => mock,
        getBookmarks: stub(),
        cacheBookmarks: stub(),
        isFollowed: stub(),
        follow: stub(),
        unfollow: stub()
    };

    mock.setupMock = (promise = Promise) => {

        mock.getBookmarks.returns(promise.resolve([]));
        mock.cacheBookmarks.returns(promise.resolve({}));
        mock.isFollowed.returns(true);
        mock.follow.returns(promise.resolve({}));
        mock.unfollow.returns(promise.resolve({}));

        return mock;
    };

    return mock.setupMock();
}

export function mockBookmarkServiceNg1(module, inject) {

    const mock = mockBookmarkService();
    const name = 'bookmarkService';

    return toNg1Mock(mock, name, module, inject);
}
