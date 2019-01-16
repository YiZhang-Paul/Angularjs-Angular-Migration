import { expect } from 'chai';

import { isDescendingOrder } from '../../../genericTestUtilities';
import MixerChannelFetcher from '../../../../data-collector/services/MixerChannelFetcher';
import ProviderRepositoryFactory from '../../../../shared/repositories/ProviderRepositoryFactory';

context('MixerChannelFetcher integration test', () => {

    let factory: ProviderRepositoryFactory;
    let fetcher: MixerChannelFetcher;

    beforeEach('test setup', async () => {

        factory = new ProviderRepositoryFactory();
        fetcher = new MixerChannelFetcher(factory.createRepository());
    });

    describe('fetch()', () => {

        it('should fetch data with current viewer count in descending order', async () => {

            const result = await fetcher.fetch();

            expect(result.length).to.equal(50);
            expect(isDescendingOrder(result, 'viewersCurrent')).to.be.true;
        });
    });

    describe('fetchByGameId()', () => {

        it('should fetch data of specified game with current viewer count in descending order', async () => {

            const expected = '70323'; // Fortnite Id

            const result = await fetcher.fetchByGameId(expected);

            expect(result.every(_ => _.id === expected));
            expect(isDescendingOrder(result, 'viewersCurrent')).to.be.true;
        });
    });
});
