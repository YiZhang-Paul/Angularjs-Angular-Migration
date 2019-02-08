export function mockComponent(module, name, template = '<div></div>') {

    module($compileProvider => {

        $compileProvider.directive(name, () => ({

            priority: 9999,
            terminal: true,
            template
        }));
    });
}
