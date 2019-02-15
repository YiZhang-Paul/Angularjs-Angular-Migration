import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockThumbnailPlayerService() {

    const mock = {

        setupMock: () => { },
        play: stub(),
        stop: stub()
    };

    return mock;
}

export function mockThumbnailPlayerServiceNg1(module, inject) {

    const mock = mockThumbnailPlayerService();
    const name = 'thumbnailPlayerService';

    return toNg1Mock(mock, name, module, inject);
}
