import { expect } from 'chai';

import ChannelFetcherFactory from '../../shared/services/data-fetcher/channel-fetcher/channel-fetcher.factory';
import IChannelFetcher from '../../shared/services/data-fetcher/channel-fetcher/channel-fetcher.interface';
import { isDescendingOrder } from '../../shared/test-utilities/generic-test-utilities';
import MixerChannelFetcher from '../../data-collector/services/mixer-channel-fetcher/mixer-channel-fetcher';

context('MixerChannelFetcher integration test', () => {

    const provider = 'mixer';
    let factory: ChannelFetcherFactory;
    let fetcher: IChannelFetcher;

    beforeEach('test setup', async () => {

        factory = new ChannelFetcherFactory();
        fetcher = await factory.createFetcher(provider);
    });

    describe('class instantiation', () => {

        it('should have default provider name', () => {

            expect(fetcher.name).to.equal(provider);
        });

        it('should be an instance of MixerChannelFetcher', () => {

            expect(fetcher instanceof MixerChannelFetcher).to.be.true;
        });
    });

    describe('fetch()', () => {

        it('should fetch data with current viewer count in descending order', async () => {

            const result = await fetcher.fetch();

            expect(result.length).to.equal(80);
            expect(isDescendingOrder(result, 'viewersCurrent')).to.be.true;
        });
    });

    describe('fetchById()', () => {

        it('should fetch data of specified channel', async () => {

            const expected = 19461551;

            const result = await fetcher.fetchById(expected);

            expect(result.length).to.equal(1);
            expect(result[0].id).to.equal(expected);
        });
    });

    describe('fetchByGameId()', () => {

        it('should fetch data of specified game with current viewer count in descending order', async () => {

            const expected = 70323; // Fortnite Id

            const result = await fetcher.fetchByGameId(expected);

            expect(result.every(_ => _.id === expected));
            expect(isDescendingOrder(result, 'viewersCurrent')).to.be.true;
        });
    });
});
