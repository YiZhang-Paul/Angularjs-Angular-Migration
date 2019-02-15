const stub = sinon.stub;

export function mock$rootScope() {

    const mock = {

        setupMock: () => mock,
        $broadcast: stub()
    };

    return mock.setupMock();
}
