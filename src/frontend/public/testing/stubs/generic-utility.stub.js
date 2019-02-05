const stub = sinon.stub;
const name = 'genericUtilityService';

export function mockGenericUtilityService(module) {

    const mock = {};

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.joinText = stub();
    mock.excludeIndex = stub();
    mock.hasMatchingValues = stub();
    mock.hasOwnProperties = stub();
    mock.findByProperties = stub();

    return mock;
}
