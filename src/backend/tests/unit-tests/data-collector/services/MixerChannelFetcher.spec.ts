import axios from 'axios';
import { expect } from 'chai';
import { Document } from 'mongoose';
import { assert as sinonExpect, SinonStub, SinonStubbedInstance, stub } from 'sinon';

import { createEmptyObjects } from '../../../genericTestUtilities';
import IProviderRepository from '../../../../shared/repositories/IProviderRepository.interface';
import { createProviderRepositoryStub } from '../../../stubs/IProviderRepository.stub';
import MixerChannelFetcher from '../../../../data-collector/services/MixerChannelFetcher';
import { createDocumentStub } from '../../../stubs/MongoDbDocument.stub';

context('MixerChannelFetcher unit test', () => {

    const gameId = '25';
    const providerId = '3';
    const searchApi = 'https://some/valid/api';
    let document: SinonStubbedInstance<Document>;
    let data: any[];
    let getStub: SinonStub;
    let repository: SinonStubbedInstance<IProviderRepository>;
    let fetcher: MixerChannelFetcher;

    beforeEach('test setup', () => {

        const urls = { search_channel_url: searchApi };
        document = createDocumentStub({ id: providerId, urls });
        data = createEmptyObjects(5);
        data.forEach(_ => _.provider_id = providerId);
        getStub = stub(axios, 'get');
        getStub.resolves({ data });
        repository = createProviderRepositoryStub(document);
        fetcher = new MixerChannelFetcher(repository);
    });

    afterEach('test teardown', () => {

        getStub.restore();
    });

    describe('fetch()', () => {

        it('should retrieve provider', async () => {

            await fetcher.fetch();

            sinonExpect.calledOnce(repository.findByName);
        });

        it('should return empty collection when provider is not found', async () => {

            repository.findByName.resolves(null);

            const result = await fetcher.fetch();

            expect(result).to.be.empty;
        });

        it('should fetch data from correct url', async () => {

            const expected = `${searchApi}?order=viewersCurrent:DESC&limit=50`;

            await fetcher.fetch();

            sinonExpect.calledOnce(getStub);
            sinonExpect.calledWith(getStub, expected);
        });

        it('should return data fetched', async () => {

            const result = await fetcher.fetch();

            expect(result).is.not.null;
            expect(result).to.deep.equal(data);
        });

        it('should return empty collection when data fetch failed', async () => {

            getStub.rejects(new Error());

            const result = await fetcher.fetch();

            expect(result).to.be.empty;
        });
    });

    describe('fetchByGameId()', () => {

        it('should retrieve provider', async () => {

            await fetcher.fetchByGameId(gameId);

            sinonExpect.calledOnce(repository.findByName);
        });

        it('should return empty collection when provider is not found', async () => {

            repository.findByName.resolves(null);

            const result = await fetcher.fetchByGameId(gameId);

            expect(result).to.be.empty;
        });

        it('should fetch data from correct url', async () => {

            const query = `?where=typeId:eq:${gameId}&order=viewersCurrent:DESC`;
            const expected = `${searchApi}${query}`;

            await fetcher.fetchByGameId(gameId);

            sinonExpect.calledOnce(getStub);
            sinonExpect.calledWith(getStub, expected);
        });

        it('should return data fetched', async () => {

            const result = await fetcher.fetchByGameId(gameId);

            expect(result).is.not.null;
            expect(result).to.deep.equal(data);
        });

        it('should return empty collection when data fetch failed', async () => {

            getStub.rejects(new Error());

            const result = await fetcher.fetchByGameId(gameId);

            expect(result).to.be.empty;
        });
    });
});
