// tslint:disable:function-name
export abstract class Authenticator { [key: string]: any }

export function authenticatorFactory($injector: any): any {

    return $injector.get('authenticatorService');
}

export const authenticatorProvider = {

    provide: Authenticator,
    useFactory: authenticatorFactory,
    deps: ['$injector']
};
