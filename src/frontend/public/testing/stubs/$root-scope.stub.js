const stub = sinon.stub;

export function mock$rootScope() {

    const mock = {

        setupMock: () => { },
        $broadcast: stub()
    };

    return mock;
}
