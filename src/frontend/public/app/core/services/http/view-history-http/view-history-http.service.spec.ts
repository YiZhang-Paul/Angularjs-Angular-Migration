import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { AuthenticatorService } from '../../authentication/authenticator/authenticator.service';
import { stubAuthenticatorService } from '../../../../testing/stubs/custom/authenticator.service.stub';
import { hasAuthenticationToken } from '../../../../testing/test-verifications/test-verifications';

import { ViewHistoryHttpService } from './view-history-http.service';

context('view history http service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/user/histories';

    let httpController: HttpTestingController;
    let service: ViewHistoryHttpService;

    let authenticatorStub: any;

    beforeEach('stubs setup', () => {

        authenticatorStub = stubAuthenticatorService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [HttpClientTestingModule],
            providers: [

                ViewHistoryHttpService,
                { provide: AuthenticatorService, useValue: authenticatorStub }
            ]
        });

        httpController = TestBed.get(HttpTestingController);
        service = TestBed.get(ViewHistoryHttpService);
    });

    afterEach('general test teardown', () => {

        httpController.verify();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(ViewHistoryHttpService);
    });

    describe('getHistories()', () => {

        it('should send GET request to correct url', () => {

            const expectedUrl = api;
            const expectedMethod = 'GET';

            service.getHistories();

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should include authentication token in request header', () => {

            service.getHistories();

            const request = httpController.expectOne(_ => true).request;
            const key = 'Authorization';
            const header = { [key]: request.headers.get(key) };

            expect(hasAuthenticationToken(header)).to.be.true;
        });

        it('should return view histories found sorted by timestamp in descending order', async () => {

            const histories = [{ timestamp: 2 }, { timestamp: 4 }, { timestamp: 6 }];
            const expected = histories.slice().reverse();

            const promise = service.getHistories();
            httpController.expectOne(_ => true).flush(histories);

            const result = await promise;

            expect(result).is.not.empty;
            expect(result).to.deep.equal(expected);
        });

        it('should return empty collection when no view history found', async () => {

            const promise = service.getHistories();
            httpController.expectOne(_ => true).flush([]);

            const result = await promise;

            expect(Array.isArray(result)).to.be.true;
            expect(result).to.be.empty;
        });

        it('should throw error when http request failed', async () => {

            const expected = 400;

            const promise = service.getHistories().catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });

    describe('addHistory()', () => {

        it('should send POST request to correct url', () => {

            const expectedUrl = api;
            const expectedMethod = 'POST';

            service.addHistory({});

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should include authentication token in request header', () => {

            service.addHistory({});

            const request = httpController.expectOne(_ => true).request;
            const key = 'Authorization';
            const header = { [key]: request.headers.get(key) };

            expect(hasAuthenticationToken(header)).to.be.true;
        });

        it('should send data along with request', () => {

            const name = 'random_name';

            const data = {

                provider_id: 1,
                provider_channel_id: 5,
                provider_game_name: name
            };

            const expected = Object.assign({ game_name: name }, data);

            service.addHistory(data);
            const request = httpController.expectOne(_ => true).request;

            expect(request.body).to.deep.equal(expected);
        });

        it('should return server response on success', async () => {

            const expected = { status: 200, data: 'random_data' };

            const promise = service.addHistory({});
            httpController.expectOne(_ => true).flush(expected);

            const result = JSON.parse(await promise);

            expect(result).to.deep.equal(expected);
        });

        it('should throw error when http request failed', async () => {

            const expected = 400;

            const promise = service.addHistory({}).catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });

    describe('deleteHistory()', () => {

        const id = 52;

        it('should send DELETE request to correct url', () => {

            const expectedUrl = `${api}/${id}`;
            const expectedMethod = 'DELETE';

            service.deleteHistory(id);

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should include authentication token in request header', () => {

            service.deleteHistory(id);

            const request = httpController.expectOne(_ => true).request;
            const key = 'Authorization';
            const header = { [key]: request.headers.get(key) };

            expect(hasAuthenticationToken(header)).to.be.true;
        });

        it('should return server response on success', async () => {

            const expected = { status: 200, data: 'random_data' };

            const promise = service.deleteHistory(id);
            httpController.expectOne(_ => true).flush(expected);

            const result = JSON.parse(await promise);

            expect(result).to.deep.equal(expected);
        });

        it('should throw error when http request failed', async () => {

            const expected = 400;

            const promise = service.deleteHistory(id).catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });

    describe('deleteHistories()', () => {

        it('should send DELETE request to correct url', () => {

            const expectedUrl = api;
            const expectedMethod = 'DELETE';

            service.deleteHistories();

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should include authentication token in request header', () => {

            service.deleteHistories();

            const request = httpController.expectOne(_ => true).request;
            const key = 'Authorization';
            const header = { [key]: request.headers.get(key) };

            expect(hasAuthenticationToken(header)).to.be.true;
        });

        it('should return server response on success', async () => {

            const expected = { status: 200, data: 'random_data' };

            const promise = service.deleteHistories();
            httpController.expectOne(_ => true).flush(expected);

            const result = JSON.parse(await promise);

            expect(result).to.deep.equal(expected);
        });

        it('should throw error when http request failed', async () => {

            const expected = 400;

            const promise = service.deleteHistories().catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });
});
