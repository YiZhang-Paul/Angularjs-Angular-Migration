// tslint:disable:function-name
export abstract class $mdPanel { [key: string]: any }

export function $mdPanelFactory($injector: any): any {

    return $injector.get('$mdPanel');
}

export const $mdPanelProvider = {

    provide: $mdPanel,
    useFactory: $mdPanelFactory,
    deps: ['$injector']
};
