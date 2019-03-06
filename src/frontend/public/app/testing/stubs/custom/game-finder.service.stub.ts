import { stub } from 'sinon';

import { GameFinder } from '../../../core/services/searching/game-finder/game-finder.service';

export function stubGameFinder() {

    const stubbed = {} as GameFinder;

    stubbed.findByName = stub().returns([]);

    return stubbed;
}
