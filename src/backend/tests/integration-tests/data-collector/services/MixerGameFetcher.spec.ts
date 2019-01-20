import { expect } from 'chai';

import GameFetcherFactory from '../../../../data-collector/services/GameFetcherFactory';
import { isDescendingOrder } from '../../../genericTestUtilities';
import IGameFetcher from '../../../../data-collector/services/IGameFetcher.interface';
import MixerGameFetcher from '../../../../data-collector/services/MixerGameFetcher';

context('MixerGameFetcher integration test', () => {

    const provider = 'mixer';
    let factory: GameFetcherFactory;
    let fetcher: IGameFetcher;

    beforeEach('test setup', async () => {

        factory = new GameFetcherFactory();
        fetcher = await factory.createFetcher(provider);
    });

    describe('class instantiation', () => {

        it('should have default provider name', () => {

            expect(fetcher.name).to.equal(provider);
        });

        it('should be an instance of MixerGameFetcher', () => {

            expect(fetcher instanceof MixerGameFetcher).to.be.true;
        });
    });

    describe('fetch()', () => {

        it('should fetch data with current viewer count in descending order', async () => {

            const result = await fetcher.fetch();

            expect(result.length).to.equal(50);
            expect(isDescendingOrder(result, 'viewersCurrent')).to.be.true;
        });
    });

    describe('fetchById()', () => {

        it('should fetch specified game data', async () => {

            const expected = 70323; // Fortnite Id

            const result = await fetcher.fetchById(expected);

            expect(result.length).to.equal(1);
            expect(result[0]['id']).to.equal(expected);
        });
    });
});
