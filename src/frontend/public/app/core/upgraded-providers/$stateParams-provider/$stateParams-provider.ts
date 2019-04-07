// tslint:disable:function-name
export abstract class $stateParams { [key: string]: any }

export function $stateParamsFactory($injector: any): any {

    return $injector.get('$stateParams');
}

export const $stateParamsProvider = {

    provide: $stateParams,
    useFactory: $stateParamsFactory,
    deps: ['$injector']
};
