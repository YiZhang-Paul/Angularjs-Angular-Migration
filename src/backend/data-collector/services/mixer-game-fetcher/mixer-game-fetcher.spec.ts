import axios from 'axios';
import { expect } from 'chai';
import { assert as sinonExpect, SinonStub, stub } from 'sinon';

import { createEmptyObjects } from '../../../shared/test-utilities/generic-test-utilities';

import MixerGameFetcher from './mixer-game-fetcher';

context('MixerGameFetcher unit test', () => {

    let data: any[];
    let getStub: SinonStub;
    let provider: { id: number; name: string; api: string };
    let fetcher: MixerGameFetcher;

    beforeEach('test setup', () => {

        data = createEmptyObjects(5);
        getStub = stub(axios, 'get');
        getStub.resolves({ data });
        provider = { id: 2, name: 'valid_provider', api: 'valid_api' };
        fetcher = new MixerGameFetcher(provider);
    });

    afterEach('test teardown', () => {

        getStub.restore();
    });

    describe('fetch()', () => {

        it('should fetch data from correct url', async () => {

            const api = provider.api;
            const expected = `${api}?order=viewersCurrent:DESC&limit=50`;

            await fetcher.fetch();

            sinonExpect.calledOnce(getStub);
            sinonExpect.calledWith(getStub, expected);
        });

        it('should return data fetched', async () => {

            const result = await fetcher.fetch();

            expect(result).is.not.empty;
            expect(result).to.deep.equal(data);
        });

        it('should return empty collection when data fetch failed', async () => {

            getStub.rejects(new Error());

            const result = await fetcher.fetch();

            expect(result).to.be.empty;
        });

        it('should attach provider id to all fetched data', async () => {

            const expected = provider.id;

            const result = await fetcher.fetch();

            expect(result).is.not.empty;
            expect(result.every(_ => _.provider_id === expected)).to.be.true;
        });
    });

    describe('fetchById()', () => {

        const gameId = 70;

        beforeEach('test setup', () => {

            getStub.resolves({ data: data[0] });
        });

        it('should fetch data from correct url', async () => {

            const expected = `${provider.api}/${gameId}`;

            await fetcher.fetchById(gameId);

            sinonExpect.calledOnce(getStub);
            sinonExpect.calledWith(getStub, expected);
        });

        it('should return data fetched', async () => {

            const result = await fetcher.fetchById(gameId);

            expect(result.length).to.equal(1);
            expect(result).to.deep.equal(data.slice(0, 1));
        });

        it('should return empty collection when data fetch failed', async () => {

            getStub.rejects(new Error());

            const result = await fetcher.fetchById(gameId);

            expect(result).to.be.empty;
        });

        it('should attach provider id to all fetched data', async () => {

            const expected = provider.id;

            const result = await fetcher.fetchById(gameId);

            expect(result.length).to.equal(1);
            expect(result.every(_ => _.provider_id === expected)).to.be.true;
        });
    });
});
