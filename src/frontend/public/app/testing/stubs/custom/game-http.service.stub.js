import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubGameHttpService() {

    const stubbed = {

        setupStub: () => stubbed,
        getGame: stub(),
        getGameByName: stub(),
        getGames: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.getGame.returns(promise.resolve({}));
        stubbed.getGameByName.returns(promise.resolve({}));
        stubbed.getGames.returns(promise.resolve([]));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubGameHttpServiceNg1(module, inject) {

    const stubbed = stubGameHttpService();
    const name = 'gameHttpService';

    return toNg1Stub(stubbed, name, module, inject);
}
