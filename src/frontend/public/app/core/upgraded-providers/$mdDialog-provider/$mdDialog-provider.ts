// tslint:disable:function-name
export abstract class $mdDialog { [key: string]: any }

export function $mdDialogFactory($injector: any): any {

    return $injector.get('$mdDialog');
}

export const $mdDialogProvider = {

    provide: $mdDialog,
    useFactory: $mdDialogFactory,
    deps: ['$injector']
};
