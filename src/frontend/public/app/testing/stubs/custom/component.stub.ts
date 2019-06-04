import { Component } from '@angular/core';

export function stubComponent(options: Component): Component {

    const meta = {

        selector: options.selector,
        template: options.template || '<div></div>',
        inputs: options.inputs,
        outputs: options.outputs,
        exportAs: options.exportAs

    } as Component;

    return Component(meta)(class {} as any);
}
