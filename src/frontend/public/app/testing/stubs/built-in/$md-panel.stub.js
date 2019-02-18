import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stub$mdPanel() {

    const stubbed = {

        setupStub: () => stubbed,
        newPanelPosition: stub(),
        open: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        const position = {

            absolute: () => position,
            center: () => position
        };

        stubbed.newPanelPosition.returns(position);
        stubbed.open.returns(promise.resolve({}));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stub$mdPanelNg1(module, inject) {

    const stubbed = stub$mdPanel();
    const name = '$mdPanel';

    return toNg1Stub(stubbed, name, module, inject);
}
