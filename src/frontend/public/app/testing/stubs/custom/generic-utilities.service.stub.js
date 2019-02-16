import { toNg1Stub } from '../stub-converter-ng1';

const stub = sinon.stub;

export function stubGenericUtilitiesService() {

    const stubbed = {

        setupStub: () => stubbed,
        joinText: stub(),
        excludeIndex: stub(),
        hasMatchingValues: stub(),
        hasOwnProperties: stub(),
        findByProperties: stub()
    };

    stubbed.setupStub = (promise = Promise) => {

        stubbed.joinText.returns('');
        stubbed.excludeIndex.returns([]);
        stubbed.hasMatchingValues.returns(true);
        stubbed.hasOwnProperties.returns(true);
        stubbed.findByProperties.returns({});

        return stubbed;
    };

    return stubbed.setupStub();
}

export function stubGenericUtilitiesServiceNg1(module, inject) {

    const stubbed = stubGenericUtilitiesService();
    const name = 'genericUtilitiesService';

    return toNg1Stub(stubbed, name, module, inject);
}
