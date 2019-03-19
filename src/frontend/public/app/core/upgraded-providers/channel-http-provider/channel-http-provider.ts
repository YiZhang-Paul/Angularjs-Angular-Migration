// tslint:disable:function-name
export abstract class ChannelHttp { [key: string]: any }

export function channelHttpFactory($injector: any): any {

    return $injector.get('channelHttpService');
}

export const channelHttpProvider = {

    provide: ChannelHttp,
    useFactory: channelHttpFactory,
    deps: ['$injector']
};
