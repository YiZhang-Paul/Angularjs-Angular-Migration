// tslint:disable:function-name
export abstract class GameManager { [key: string]: any }

export function gameManagerFactory($injector: any): any {

    return $injector.get('gameManagerService');
}

export const gameManagerProvider = {

    provide: GameManager,
    useFactory: gameManagerFactory,
    deps: ['$injector']
};
