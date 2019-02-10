// tslint:disable:function-name
export abstract class $state { [key: string]: any }

export function $stateFactory($injector: any): any {

    return $injector.get('$state');
}

export const $stateProvider = {

    provide: $state,
    useFactory: $stateFactory,
    deps: ['$injector']
};
