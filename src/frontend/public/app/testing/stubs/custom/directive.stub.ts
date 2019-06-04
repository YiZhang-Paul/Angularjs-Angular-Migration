import { Directive } from '@angular/core';

export function stubDirective(options: Directive): Directive {

    const meta = {

        selector: options.selector,
        inputs: options.inputs,
        outputs: options.outputs

    } as Directive;

    return Directive(meta)(class {} as any);
}
