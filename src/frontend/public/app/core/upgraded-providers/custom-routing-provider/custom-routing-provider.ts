// tslint:disable:function-name
export abstract class CustomRoutingService { [key: string]: any }

export function customRoutingServiceFactory($injector: any): any {

    return $injector.get('customRoutingService');
}

export const customRoutingServiceProvider = {

    provide: CustomRoutingService,
    useFactory: customRoutingServiceFactory,
    deps: ['$injector']
};
