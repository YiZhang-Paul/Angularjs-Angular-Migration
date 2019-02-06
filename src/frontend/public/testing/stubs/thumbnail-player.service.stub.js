const stub = sinon.stub;
const name = 'thumbnailPlayerService';

export function mockThumbnailPlayerService(module) {

    const mock = {};

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.play = stub();
    mock.stop = stub();

    return mock;
}
