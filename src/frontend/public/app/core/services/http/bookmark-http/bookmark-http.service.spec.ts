import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { AuthenticatorService } from '../../authentication/authenticator/authenticator.service';
import { stubAuthenticatorService } from '../../../../testing/stubs/custom/authenticator.service.stub';
import { hasAuthenticationToken } from '../../../../testing/test-verifications/test-verifications';

import { BookmarkHttpService } from './bookmark-http.service';

context('bookmark http service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/user/bookmarks';

    let httpController: HttpTestingController;
    let service: BookmarkHttpService;

    let authenticatorStub;

    beforeEach('stubs setup', () => {

        authenticatorStub = stubAuthenticatorService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [HttpClientTestingModule],
            providers: [

                BookmarkHttpService,
                { provide: AuthenticatorService, useValue: authenticatorStub }
            ]
        });

        httpController = TestBed.get(HttpTestingController);
        service = TestBed.get(BookmarkHttpService);
    });

    afterEach('general test teardown', () => {

        httpController.verify();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(BookmarkHttpService);
    });

    describe('getBookmarks()', () => {

        it('should send GET request to correct url', () => {

            const expectedUrl = api;
            const expectedMethod = 'GET';

            service.getBookmarks();

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should include authentication token in request header', () => {

            service.getBookmarks();

            const request = httpController.expectOne(_ => true).request;
            const key = 'Authorization';
            const header = { [key]: request.headers.get(key) };

            expect(hasAuthenticationToken(header)).to.be.true;
        });

        it('should return bookmarks found', async () => {

            const expected = [{ id: 1 }, { id: 5 }];

            const promise = service.getBookmarks();
            httpController.expectOne(_ => true).flush(expected);

            const result = await promise;

            expect(result).is.not.empty;
            expect(result).to.deep.equal(expected);
        });

        it('should return empty collection when no bookmark found', async () => {

            const promise = service.getBookmarks();
            httpController.expectOne(_ => true).flush([]);

            const result = await promise;

            expect(Array.isArray(result)).to.be.true;
            expect(result).to.be.empty;
        });

        it('should throw error when http request failed', async () => {

            const expected = 400;

            const promise = service.getBookmarks().catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });

    describe('addBookmark()', () => {

        it('should send POST request to correct url', () => {

            const expectedUrl = api;
            const expectedMethod = 'POST';

            service.addBookmark({});

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should include authentication token in request header', () => {

            service.addBookmark({});

            const request = httpController.expectOne(_ => true).request;
            const key = 'Authorization';
            const header = { [key]: request.headers.get(key) };

            expect(hasAuthenticationToken(header)).to.be.true;
        });

        it('should send data along with request', () => {

            const expected = { data: 'bookmark_data' };

            service.addBookmark(expected);
            const request = httpController.expectOne(_ => true).request;

            expect(request.body).to.deep.equal(expected);
        });

        it('should return server response on success', async () => {

            const expected = { status: 200, data: 'random_data' };

            const promise = service.addBookmark(expected);
            httpController.expectOne(_ => true).flush(expected);

            const result = JSON.parse(await promise);

            expect(result).to.deep.equal(expected);
        });

        it('should throw error when http request failed', async () => {

            const expected = 400;

            const promise = service.addBookmark({}).catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });

    describe('deleteBookmark()', () => {

        const id = 29;

        it('should send DELETE request to correct url', () => {

            const expectedUrl = `${api}/${id}`;
            const expectedMethod = 'DELETE';

            service.deleteBookmark(id);

            const request = httpController.expectOne(expectedUrl).request;

            expect(request.method).to.equal(expectedMethod);
        });

        it('should include authentication token in request header', () => {

            service.deleteBookmark(id);

            const request = httpController.expectOne(_ => true).request;
            const key = 'Authorization';
            const header = { [key]: request.headers.get(key) };

            expect(hasAuthenticationToken(header)).to.be.true;
        });

        it('should return server response on success', async () => {

            const expected = { status: 200, data: 'random_data' };

            const promise = service.deleteBookmark(id);
            httpController.expectOne(_ => true).flush(expected);

            const result = JSON.parse(await promise);

            expect(result).to.deep.equal(expected);
        });

        it('should throw error when http request failed', async () => {

            const expected = 400;

            const promise = service.deleteBookmark(id).catch(error => error);
            httpController.expectOne(_ => true).error(null, { status: expected });

            const result = await promise;

            expect(result.status).to.equal(expected);
        });
    });
});
