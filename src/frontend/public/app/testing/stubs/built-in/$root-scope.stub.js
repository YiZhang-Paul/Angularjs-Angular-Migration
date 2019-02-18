const stub = sinon.stub;

export function stub$rootScope() {

    const stubbed = {

        setupStub: () => stubbed,
        $broadcast: stub()
    };

    return stubbed.setupStub();
}
