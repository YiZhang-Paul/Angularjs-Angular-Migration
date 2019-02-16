import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubMdPanelRef() {

    const stubbed = {

        setupStub: () => stubbed,
        close: stub(),
        destroy: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.close.returns(promise.resolve({}));
        stubbed.destroy.returns(promise.resolve({}));

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubMdPanelRefNg1(module, inject) {

    const stubbed = stubMdPanelRef();
    const name = 'mdPanelRef';

    return toNg1Stub(stubbed, name, module, inject);
}
