import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { ChannelHttpService } from './channel-http.service';

context('channel http service unit test', () => {

    const channelApi = 'http://127.0.0.1:4150/api/v1/channels';
    const gameChannelApi = 'http://127.0.0.1:4150/api/v1/games';

    let httpController: HttpTestingController;
    let service: ChannelHttpService;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [HttpClientTestingModule],
            providers: [ChannelHttpService]
        });

        httpController = TestBed.get(HttpTestingController);
        service = TestBed.get(ChannelHttpService);
    });

    afterEach('general test teardown', () => {

        httpController.verify();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(ChannelHttpService);
    });

    describe('getChannels()', () => {

        it('should send GET request to correct url', () => {

            const expectedUrl = channelApi;
            const expectedMethod = 'GET';

            service.getChannels();

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should return all data found', async () => {

            const expected = [{ data: 'data_1' }, { data: 'data_2' }];

            const promise = service.getChannels();
            httpController.expectOne(_ => true).flush(expected);

            const result = await promise;

            expect(result).is.not.empty;
            expect(result).to.deep.equal(expected);
        });

        it('should return empty collection when no channel found', async () => {

            const promise = service.getChannels();
            httpController.expectOne(_ => true).flush([]);

            const result = await promise;

            expect(Array.isArray(result)).to.be.true;
            expect(result).to.be.empty;
        });

        it('should throw error when request failed', async () => {

            const expected = 400;

            const promise = service.getChannels().catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });

    describe('getChannelsByGameId()', () => {

        const id = 92;

        it('should send GET request to correct url', () => {

            const expectedUrl = `${gameChannelApi}/${id}/channels`;
            const expectedMethod = 'GET';

            service.getChannelsByGameId(id);

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should return all data found', async () => {

            const expected = [{ data: 'data_1' }, { data: 'data_2' }];

            const promise = service.getChannelsByGameId(id);
            httpController.expectOne(_ => true).flush(expected);

            const result = await promise;

            expect(result).is.not.empty;
            expect(result).to.deep.equal(expected);
        });

        it('should return empty collection when no channel found', async () => {

            const promise = service.getChannelsByGameId(id);
            httpController.expectOne(_ => true).flush([]);

            const result = await promise;

            expect(Array.isArray(result)).to.be.true;
            expect(result).to.be.empty;
        });

        it('should throw error when request failed', async () => {

            const expected = 400;

            const promise = service.getChannelsByGameId(id).catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });
});
