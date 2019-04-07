// tslint:disable:function-name
export abstract class GameHttp { [key: string]: any }

export function gameHttpFactory($injector: any): any {

    return $injector.get('gameHttpService');
}

export const gameHttpProvider = {

    provide: GameHttp,
    useFactory: gameHttpFactory,
    deps: ['$injector']
};
