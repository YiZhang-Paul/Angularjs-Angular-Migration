const stub = sinon.stub;
const name = 'channelService';

export function mockChannelService(module, inject) {

    const mock = { initializeMock: null };

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.initializeMock = () => inject($injector => {

        const $q = $injector.get('$q');
        mock.getChannelsByGameId = stub().returns($q.resolve([]));
        mock.refreshChannels = stub();
        mock.isFollowed = stub().returns(true);
        mock.follow = stub().returns($q.resolve({}));
        mock.unfollow = stub().returns($q.resolve({}));
    });

    return mock;
}
