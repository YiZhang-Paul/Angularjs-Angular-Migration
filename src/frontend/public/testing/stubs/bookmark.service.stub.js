const stub = sinon.stub;
const name = 'bookmarkService';

export function mockBookmarkService(module, inject) {

    const mock = { initializeMock: null };

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.initializeMock = () => inject($injector => {

        const $q = $injector.get('$q');
        mock.getBookmarks = stub().returns($q.resolve([]));
        mock.cacheBookmarks = stub().returns($q.resolve({}));
        mock.isFollowed = stub().returns(true);
        mock.follow = stub().returns($q.resolve({}));
        mock.unfollow = stub().returns($q.resolve({}));
    });

    return mock;
}
