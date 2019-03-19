// tslint:disable:function-name
export abstract class BookmarkManager { [key: string]: any }

export function bookmarkManagerFactory($injector: any): any {

    return $injector.get('bookmarkManagerService');
}

export const bookmarkManagerProvider = {

    provide: BookmarkManager,
    useFactory: bookmarkManagerFactory,
    deps: ['$injector']
};
