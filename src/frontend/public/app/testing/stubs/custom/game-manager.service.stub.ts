import { stub } from 'sinon';

import { GameManagerService } from '../../../core/services/data-managers/game-manager/game-manager.service';

export function stubGameManagerService() {

    const stubbed = {} as GameManagerService;

    stubbed.games = [];
    stubbed.cacheGames = stub();

    return stubbed;
}
