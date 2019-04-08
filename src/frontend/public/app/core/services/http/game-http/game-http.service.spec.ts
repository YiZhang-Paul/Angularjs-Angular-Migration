import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { GameHttpService } from './game-http.service';

context('game http service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/games';

    let httpController: HttpTestingController;
    let service: GameHttpService;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [HttpClientTestingModule],
            providers: [GameHttpService]
        });

        httpController = TestBed.get(HttpTestingController);
        service = TestBed.get(GameHttpService);
    });

    afterEach('general test teardown', () => {

        httpController.verify();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(GameHttpService);
    });

    describe('getGame()', () => {

        const id = 17;

        it('should send GET request to correct url', () => {

            const expectedUrl = `${api}/${id}`;
            const expectedMethod = 'GET';

            service.getGame(id);

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should return first data in response collection', async () => {

            const expected = { data: 'random_data' };

            const promise = service.getGame(id);
            httpController.expectOne(_ => true).flush([expected]);

            const result = await promise;

            expect(result).to.deep.equal(expected);
        });

        it('should return null when no game found', async () => {

            const promise = service.getGame(id);
            httpController.expectOne(_ => true).flush([]);

            const result = await promise;

            expect(result).to.be.null;
        });

        it('should throw error when request failed', async () => {

            const expected = 400;

            const promise = service.getGame(id).catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });

    describe('getGameByName()', () => {

        it('should send GET request to correct url', () => {

            const expectedUrl = api;
            const expectedMethod = 'GET';

            service.getGameByName('');

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should return game data found', async () => {

            const name = 'random game name';
            const games = [{ name: 'name_1' }, { name }, { name: 'name_3' }];
            const expected = name;

            const promise = service.getGameByName(expected);
            httpController.expectOne(_ => true).flush(games);

            const result = await promise;

            expect(result).is.not.null;
            expect(result.name).to.equal(expected);
        });

        it('should return null when game data is not found', async () => {

            const name = 'name_2';
            const games = [{ name: 'name_1' }, { name: 'name_3' }];

            const promise = service.getGameByName(name);
            httpController.expectOne(_ => true).flush(games);

            const result = await promise;

            expect(games.every(_ => _.name !== name)).to.be.true;
            expect(result).is.null;
        });

        it('should throw error when request failed', async () => {

            const expected = 400;

            const promise = service.getGameByName('').catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });

    describe('getGames()', () => {

        it('should send GET request to correct url', () => {

            const expectedUrl = api;
            const expectedMethod = 'GET';

            service.getGames();

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should return all data found', async () => {

            const expected = [{ data: 'data_1' }, { data: 'data_2' }];

            const promise = service.getGames();
            httpController.expectOne(_ => true).flush(expected);

            const result = await promise;

            expect(result).is.not.empty;
            expect(result).to.deep.equal(expected);
        });

        it('should return empty collection when no game found', async () => {

            const promise = service.getGames();
            httpController.expectOne(_ => true).flush([]);

            const result = await promise;

            expect(Array.isArray(result)).to.be.true;
            expect(result).to.be.empty;
        });

        it('should throw error when request failed', async () => {

            const expected = 400;

            const promise = service.getGames().catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });
});
