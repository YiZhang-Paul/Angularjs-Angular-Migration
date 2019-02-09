// tslint:disable:function-name
export abstract class $rootScope { [key: string]: any }

export function $rootScopeFactory($injector: any): any {

    return $injector.get('$rootScope');
}

export const $rootScopeProvider = {

    provide: $rootScope,
    useFactory: $rootScopeFactory,
    deps: ['$injector']
};
