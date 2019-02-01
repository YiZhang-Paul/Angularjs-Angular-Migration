import ComponentsModule from '../components.module';

import { hasAuthenticationToken, hasMatchingValue } from '../../shared/utilities/test-utilities/test-verifications';

import { BookmarkService } from './bookmark.service';

const mockModule = angular.mock.module;

context('bookmark service unit test', () => {

    const api = 'http://127.0.0.1:4150/api/v1/user/bookmarks';

    let q;
    let httpBackend;
    let service;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('test setup', inject($injector => {

        q = $injector.get('$q');
        httpBackend = $injector.get('$httpBackend');
        service = $injector.get('bookmarkService');
    }));

    beforeEach('mock http backend setup', () => {

        httpBackend.whenGET(/.*/).respond([]);
        httpBackend.whenPOST(/.*/).respond({});
        httpBackend.whenDELETE(/.*/).respond({});
        httpBackend.flush();
    });

    beforeEach('mock data setup', () => {

        service.bookmarks = [

            { id: 9, provider_id: 1, provider_channel_id: 87 },
            { id: 2, provider_id: 0, provider_channel_id: 22 },
            { id: 5, channel_id: 19 },
            { id: 7, channel_id: 11 },
            { id: 9, provider_id: 2, provider_channel_id: 54 }
        ];
    });

    afterEach('test teardown', () => {

        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    it('should load bookmarks on instantiation', inject($injector => {

        const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
        httpBackend.expectGET(/.*/).respond(expected);

        service = $injector.instantiate(BookmarkService);

        httpBackend.flush();

        expect(service.bookmarks).to.deep.equal(expected);
    }));

    describe('getBookmarks()', () => {

        it('should send GET request to correct url', () => {

            const expected = api;
            httpBackend.expectGET(expected).respond([]);

            service.getBookmarks();

            httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            httpBackend.expectGET(/.*/, hasAuthenticationToken).respond([]);

            service.getBookmarks();

            httpBackend.flush();
        });

        it('should return bookmarks found', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            httpBackend.expectGET(/.*/).respond(expected);

            service.getBookmarks().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            httpBackend.flush();
        });

        it('should return empty collection when no bookmark found', () => {

            httpBackend.expectGET(/.*/).respond([]);

            service.getBookmarks().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            })

            httpBackend.flush();
        });

        it('should return empty collection when http request failed', () => {

            httpBackend.expectGET(/.*/).respond(404);

            service.getBookmarks().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            })

            httpBackend.flush();
        });
    });

    describe('isFollowed()', () => {

        it('should return true when bookmark with matching channel id is found', () => {

            const channelId = service.bookmarks[2].channel_id;
            const data = { channel_id: channelId };

            expect(channelId).is.not.undefined;
            expect(service.isFollowed(data)).to.be.true;
        });

        it('should return true when bookmark with matching provider information is found', () => {

            const bookmark = service.bookmarks[1];
            const providerId = bookmark.provider_id;
            const providerChannelId = bookmark.provider_channel_id;
            const data = { provider_id: providerId, provider_channel_id: providerChannelId };

            expect(providerId).is.not.undefined;
            expect(providerChannelId).is.not.undefined;
            expect(service.isFollowed(data)).to.be.true;
        });

        it('should return false when input data is invalid', () => {

            expect(service.isFollowed({})).to.be.false;
        });

        it('should return false when no bookmark with matching channel id is found', () => {

            const bookmarks = service.bookmarks;
            const data = { channel_id: -1 };

            expect(hasMatchingValue(data, bookmarks, 'channel_id')).to.be.false;
            expect(service.isFollowed(data)).to.be.false;
        });

        it('should return false when no bookmark with matching provider information is found', () => {

            const bookmarks = service.bookmarks;
            const data = { provider_id: -1, provider_channel_id: -1 };

            expect(hasMatchingValue(data, bookmarks, 'provider_id')).to.be.false;
            expect(hasMatchingValue(data, bookmarks, 'provider_channel_id')).to.be.false;
            expect(service.isFollowed(data)).to.be.false;
        });
    });

    describe('follow()', () => {

        it('should send POST request to correct url', () => {

            const expected = api;
            httpBackend.expectPOST(expected).respond({});

            service.follow({});

            httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            const data = {};
            httpBackend.expectPOST(/.*/, data, hasAuthenticationToken).respond({});

            service.follow(data);

            httpBackend.flush();
        });

        it('should send data along with request', () => {

            const expected = { provider_id: 1, provider_channel_id: 5 };
            httpBackend.expectPOST(/.*/, expected).respond({});

            service.follow(expected);

            httpBackend.flush();
        });

        it('should cache bookmarks when added successfully', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            httpBackend.expectGET(/.*/).respond(expected);

            service.follow({}).then(() => {

                expect(service.bookmarks).to.deep.equal(expected);
            });

            httpBackend.flush();
        });

        it('should return server response on success', () => {

            const expected = { status: 200, data: 'random_data' };
            httpBackend.expectPOST(/.*/).respond(expected);

            service.follow({}).then(result => {

                expect(result).to.deep.equal(expected);
            });

            httpBackend.flush();
        });

        it('should throw error when http request failed', () => {

            const expected = 404;
            httpBackend.expectPOST(/.*/).respond(expected);

            service.follow({})
                .then(() => q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            httpBackend.flush();
        });
    });

    describe('unfollow()', () => {

        it('should send DELETE request to correct url', () => {

            const bookmark = service.bookmarks[2];
            const data = { channel_id: bookmark.channel_id };
            const expected = `${api}/${bookmark.id}`;
            httpBackend.expectDELETE(expected).respond({});

            service.unfollow(data);

            httpBackend.flush();
        });

        it('should include authentication token in request header', () => {

            httpBackend.expectDELETE(/.*/, hasAuthenticationToken).respond({});

            service.unfollow({});

            httpBackend.flush();
        });

        it('should update bookmarks cache when deleted successfully', () => {

            const expected = [{ id: 1 }, { id: 5 }];
            httpBackend.expectGET(/.*/).respond(expected);

            service.unfollow({}).then(() => {

                expect(service.bookmarks).to.deep.equal(expected);
            });

            httpBackend.flush();
        });

        it('should return server response on success', () => {

            const expected = { status: 200, data: 'random_data' };
            httpBackend.expectDELETE(/.*/).respond(expected);

            service.unfollow({}).then(result => {

                expect(result).to.deep.equal(expected);
            });

            httpBackend.flush();
        });

        it('should throw error when http request failed', () => {

            const expected = 404;
            httpBackend.expectDELETE(/.*/).respond(expected);

            service.unfollow({})
                .then(() => q.reject(new Error()))
                .catch(error => expect(error.status).to.equal(expected));

            httpBackend.flush();
        });
    });
});
