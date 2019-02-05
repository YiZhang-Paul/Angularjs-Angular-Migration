const stub = sinon.stub;

export function mockAuthenticator() {

    const mock = { defaultOptions: null };
    const headers = { Authorization: 'bearer xxx.xxxx.xxx' };

    stub(mock, 'defaultOptions').get(() => ({ headers }));

    return mock;
}
