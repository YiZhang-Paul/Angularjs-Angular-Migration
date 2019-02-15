import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockGenericUtilityService() {

    const mock = {

        setupMock: () => { },
        joinText: stub(),
        excludeIndex: stub(),
        hasMatchingValues: stub(),
        hasOwnProperties: stub(),
        findByProperties: stub()
    };

    mock.setupMock = (promise = Promise) => {

        mock.joinText.returns('');
        mock.excludeIndex.returns([]);
        mock.hasMatchingValues.returns(true);
        mock.hasOwnProperties.returns(true);
        mock.findByProperties.returns({});
    };

    return mock;
}

export function mockGenericUtilityServiceNg1(module, inject) {

    const mock = mockGenericUtilityService();
    const name = 'genericUtilityService';

    return toNg1Mock(mock, name, module, inject);
}
