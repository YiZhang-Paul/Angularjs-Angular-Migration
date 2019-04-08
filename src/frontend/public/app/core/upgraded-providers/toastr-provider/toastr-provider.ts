// tslint:disable:function-name
export abstract class Toastr { [key: string]: any }

export function toastrFactory($injector: any): any {

    return $injector.get('toastr');
}

export const toastrProvider = {

    provide: Toastr,
    useFactory: toastrFactory,
    deps: ['$injector']
};
