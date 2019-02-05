const stub = sinon.stub;
const name = '$state';

export function mock$state(module) {

    const mock = {};

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.go = stub();

    return mock;
}
