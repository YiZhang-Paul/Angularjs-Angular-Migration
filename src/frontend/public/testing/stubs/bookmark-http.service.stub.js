import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockBookmarkHttpService() {

    const mock = {

        setupMock: () => mock,
        getBookmarks: stub(),
        addBookmark: stub(),
        deleteBookmark: stub()
    };

    mock.setupMock = (promise = Promise) => {

        mock.getBookmarks.returns(promise.resolve([]));
        mock.addBookmark.returns(promise.resolve({}));
        mock.deleteBookmark.returns(promise.resolve({}));

        return mock;
    };

    return mock.setupMock();
}

export function mockBookmarkHttpServiceNg1(module, inject) {

    const mock = mockBookmarkHttpService();
    const name = 'bookmarkHttpService';

    return toNg1Mock(mock, name, module, inject);
}
