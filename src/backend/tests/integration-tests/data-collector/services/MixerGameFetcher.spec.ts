import { expect } from 'chai';

import { isDescendingOrder } from '../../../genericTestUtilities';
import MixerGameFetcher from '../../../../data-collector/services/MixerGameFetcher';
import ProviderRepositoryFactory from '../../../../shared/repositories/ProviderRepositoryFactory';

context('MixerGameFetcher integration test', () => {

    let factory: ProviderRepositoryFactory;
    let fetcher: MixerGameFetcher;

    beforeEach('test setup', async () => {

        factory = new ProviderRepositoryFactory();
        fetcher = new MixerGameFetcher(factory.createRepository());
    });

    describe('fetch()', () => {

        it('should fetch data with current viewer count in descending order', async () => {

            const result = await fetcher.fetch();

            expect(result.length).to.equal(50);
            expect(isDescendingOrder(result, 'viewersCurrent')).to.be.true;
        });
    });
});
