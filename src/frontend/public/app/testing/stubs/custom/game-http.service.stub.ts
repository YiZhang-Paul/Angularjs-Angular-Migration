import { stub } from 'sinon';

import { GameHttpService } from '../../../core/services/http/game-http/game-http.service';

export function stubGameHttpService() {

    const stubbed = {} as GameHttpService;

    stubbed.getGame = stub().resolves({});
    stubbed.getGameByName = stub().resolves({});
    stubbed.getGames = stub().resolves([]);

    return stubbed;
}
