import { toNg1Mock } from './mock-converter-ng1';

const stub = sinon.stub;

export function mockGenericUtilityService() {

    const mock = {

        setupMock: () => mock,
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

        return mock;
    };

    return mock.setupMock();
}

export function mockGenericUtilityServiceNg1(module, inject) {

    const mock = mockGenericUtilityService();
    const name = 'genericUtilityService';

    return toNg1Mock(mock, name, module, inject);
}
