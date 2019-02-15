import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockGameHttpService() {

    const mock = {

        setupMock: () => { },
        getGame: stub(),
        getGameByName: stub(),
        getGames: stub()
    };

    mock.setupMock = (promise = Promise) => {

        mock.getGame.returns(promise.resolve({}));
        mock.getGameByName.returns(promise.resolve({}));
        mock.getGames.returns(promise.resolve([]));
    };

    return mock;
}

export function mockGameHttpServiceNg1(module, inject) {

    const mock = mockGameHttpService();
    const name = 'gameHttpService';

    return toNg1Mock(mock, name, module, inject);
}
