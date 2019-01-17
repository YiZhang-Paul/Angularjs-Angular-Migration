import axios from 'axios';
import { expect } from 'chai';
import { assert as sinonExpect, SinonStub, SinonStubbedInstance, stub } from 'sinon';

import { createEmptyObjects } from '../../../genericTestUtilities';
import IProviderRepository from '../../../../shared/repositories/IProviderRepository.interface';
import { createProviderRepositoryStub } from '../../../stubs/IProviderRepository.stub';
import MixerChannelFetcher from '../../../../data-collector/services/MixerChannelFetcher';

context('MixerChannelFetcher unit test', () => {

    const api = 'https://some/valid/api';
    const id = '25';
    let data: any[];
    let getStub: SinonStub;
    let repository: SinonStubbedInstance<IProviderRepository>;
    let fetcher: MixerChannelFetcher;

    beforeEach('test setup', () => {

        data = createEmptyObjects(5);
        getStub = stub(axios, 'get');
        getStub.resolves({ data });
        repository = createProviderRepositoryStub(api);
        fetcher = new MixerChannelFetcher(repository);
    });

    afterEach('test teardown', () => {

        getStub.restore();
    });

    describe('fetch()', () => {

        it('should retrieve API url', async () => {

            await fetcher.fetch();

            sinonExpect.calledOnce(repository.findApi);
        });

        it('should return empty collection when API url is not found', async () => {

            repository.findApi.resolves(null);

            const result = await fetcher.fetch();

            expect(result).to.be.empty;
        });

        it('should fetch data from correct url', async () => {

            const expected = `${api}?order=viewersCurrent:DESC&limit=50`;

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

        it('should retrieve API url', async () => {

            await fetcher.fetchByGameId(id);

            sinonExpect.calledOnce(repository.findApi);
        });

        it('should return empty collection when API url is not found', async () => {

            repository.findApi.resolves(null);

            const result = await fetcher.fetchByGameId(id);

            expect(result).to.be.empty;
        });

        it('should fetch data from correct url', async () => {

            const expected = `${api}?where=typeId:eq:${id}&order=viewersCurrent:DESC`;

            await fetcher.fetchByGameId(id);

            sinonExpect.calledOnce(getStub);
            sinonExpect.calledWith(getStub, expected);
        });

        it('should return data fetched', async () => {

            const result = await fetcher.fetchByGameId(id);

            expect(result).is.not.null;
            expect(result).to.deep.equal(data);
        });

        it('should return empty collection when data fetch failed', async () => {

            getStub.rejects(new Error());

            const result = await fetcher.fetchByGameId(id);

            expect(result).to.be.empty;
        });
    });
});