// tslint:disable:function-name
export abstract class ThumbnailPlayer { [key: string]: any }

export function thumbnailPlayerFactory($injector: any): any {

    return $injector.get('thumbnailPlayerService');
}

export const thumbnailPlayerProvider = {

    provide: ThumbnailPlayer,
    useFactory: thumbnailPlayerFactory,
    deps: ['$injector']
};
