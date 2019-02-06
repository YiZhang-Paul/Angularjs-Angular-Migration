const stub = sinon.stub;
const name = 'genericUtilityService';

export function mockGenericUtilityService(module) {

    const mock = {};

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.joinText = stub().returns('');
    mock.excludeIndex = stub().returns([]);
    mock.hasMatchingValues = stub().returns(true);
    mock.hasOwnProperties = stub().returns(true);
    mock.findByProperties = stub().returns({});

    return mock;
}
