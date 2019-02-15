function setProvider(mock, name, module) {

    module($provide => {

        $provide.service(name, () => mock);
    });
}

function patchSetup(mock, inject) {

    const setup = mock.setupMock;

    mock.setupMock = () => inject($injector => {

        setup($injector.get('$q'));
    });
}

export function toNg1Mock(mock, name, module, inject) {

    setProvider(mock, name, module);
    patchSetup(mock, inject);

    return mock;
}
