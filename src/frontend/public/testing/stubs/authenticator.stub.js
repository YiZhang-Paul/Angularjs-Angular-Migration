const stub = sinon.stub;
const name = 'authenticatorService';

export function mockAuthenticatorService(module) {

    const mock = { defaultOptions: null };

    module($provide => {

        $provide.service(name, () => mock);
    });

    const headers = { Authorization: 'bearer xxx.xxxx.xxx' };
    stub(mock, 'defaultOptions').get(() => ({ headers }));

    return mock;
}
