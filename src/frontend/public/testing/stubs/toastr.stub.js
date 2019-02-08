const stub = sinon.stub;
const name = 'toastr';

export function mockToastr(module) {

    const mock = {};

    module($provide => {

        $provide.service(name, () => mock);
    });

    mock.success = stub();
    mock.error = stub();

    return mock;
}
