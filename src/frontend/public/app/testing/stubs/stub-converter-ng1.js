function replaceProvider(stubbed, name, module) {

    module($provide => {

        $provide.service(name, () => stubbed);
    });
}

function patchStubSetup(stubbed, inject) {

    const setup = stubbed.setupStub;

    stubbed.setupStub = () => inject($injector => {

        setup($injector.get('$q'));
    });
}

export function toNg1Stub(stubbed, name, module, inject) {

    replaceProvider(stubbed, name, module);
    patchStubSetup(stubbed, inject);

    return stubbed;
}
