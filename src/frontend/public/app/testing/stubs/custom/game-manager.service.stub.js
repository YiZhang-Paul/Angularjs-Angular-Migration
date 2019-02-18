import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubGameManagerService() {

    const stubbed = {

        setupStub: () => stubbed,
        cacheGames: stub()
    };

    return stubbed.setupStub();
}

export function stubGameManagerServiceNg1(module, inject) {

    const stubbed = stubGameManagerService();
    const name = 'gameManagerService';

    return toNg1Stub(stubbed, name, module, inject);
}
