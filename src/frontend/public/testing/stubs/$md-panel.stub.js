import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mock$mdPanel() {

    const mock = {

        setupMock: () => { },
        newPanelPosition: stub(),
        open: stub()
    };

    mock.setupMock = (promise = Promise) => {

        const position = {

            absolute: () => position,
            center: () => position
        };

        mock.newPanelPosition.returns(position);
        mock.open.returns(promise.resolve({}));
    };

    return mock;
}

export function mock$mdPanelNg1(module, inject) {

    const mock = mock$mdPanel();
    const name = '$mdPanel';

    return toNg1Mock(mock, name, module, inject);
}
