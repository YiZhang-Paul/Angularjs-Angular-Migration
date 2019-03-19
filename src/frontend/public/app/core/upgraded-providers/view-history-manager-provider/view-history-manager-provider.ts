// tslint:disable:function-name
export abstract class ViewHistoryManager { [key: string]: any }

export function viewHistoryManagerFactory($injector: any): any {

    return $injector.get('viewHistoryManagerService');
}

export const viewHistoryManagerProvider = {

    provide: ViewHistoryManager,
    useFactory: viewHistoryManagerFactory,
    deps: ['$injector']
};
