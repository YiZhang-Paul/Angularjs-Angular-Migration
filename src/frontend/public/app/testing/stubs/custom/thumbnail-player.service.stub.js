import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubThumbnailPlayerService() {

    const stubbed = {

        setupStub: () => stubbed,
        play: stub(),
        stop: stub()
    };

    return stubbed.setupStub();
}

export function stubThumbnailPlayerServiceNg1(module, inject) {

    const stubbed = stubThumbnailPlayerService();
    const name = 'thumbnailPlayerService';

    return toNg1Stub(stubbed, name, module, inject);
}
