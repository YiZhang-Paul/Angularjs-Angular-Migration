// tslint:disable:function-name
export abstract class LoginService { [key: string]: any }

export function loginServiceFactory($injector: any): any {

    return $injector.get('loginService');
}

export const loginServiceProvider = {

    provide: LoginService,
    useFactory: loginServiceFactory,
    deps: ['$injector']
};
