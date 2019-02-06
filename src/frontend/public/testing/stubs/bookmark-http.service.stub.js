const stub = sinon.stub;
const name = 'bookmarkHttpService';

export function mockBookmarkHttpService(module, inject) {

    const mock = { initializeMock: null };

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.initializeMock = () => inject($injector => {

        const $q = $injector.get('$q');
        mock.getBookmarks = stub().returns($q.resolve([]));
        mock.addBookmark = stub().returns($q.resolve({}));
        mock.deleteBookmark = stub().returns($q.resolve({}));
    });

    return mock;
}
