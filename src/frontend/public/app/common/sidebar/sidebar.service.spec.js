import CommonModule from '../common.module';

import { mockBookmarkHttpService } from '../../../testing/stubs/bookmark-http.service.stub';
import { mockChannelHttpService } from '../../../testing/stubs/channel-http.service.stub';
import { mockViewHistoryHttpService } from '../../../testing/stubs/view-history-http.service.stub';

const mockModule = angular.mock.module;
const sinonExpect = sinon.assert;

context('sidebar service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let bookmarkHttpServiceStub;
    let channelHttpServiceStub;
    let viewHistoryHttpServiceStub;

    beforeEach(mockModule(CommonModule));

    beforeEach('mocks setup', () => {

        bookmarkHttpServiceStub = mockBookmarkHttpService(mockModule, inject);
        channelHttpServiceStub = mockChannelHttpService(mockModule, inject);
        viewHistoryHttpServiceStub = mockViewHistoryHttpService(mockModule, inject);

        bookmarkHttpServiceStub.initializeMock();
        channelHttpServiceStub.initializeMock();
        viewHistoryHttpServiceStub.initializeMock();
    });

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('sidebarService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getBookmarks()', () => {

        it('should use bookmark http service to fetch data', () => {

            service.getBookmarks();

            sinonExpect.calledOnce(bookmarkHttpServiceStub.getBookmarks);
        });

        it('should return bookmarks found', () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            bookmarkHttpServiceStub.getBookmarks.returns($q.resolve(expected));

            service.getBookmarks().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should return empty collection when no bookmark found', () => {

            bookmarkHttpServiceStub.getBookmarks.returns($q.resolve([]));

            service.getBookmarks().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to retrieve bookmarks', () => {

            bookmarkHttpServiceStub.getBookmarks.returns($q.reject(new Error()));

            service.getBookmarks().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });
    });

    describe('getFeaturedChannels()', () => {

        it('should use channel http service to fetch data', () => {

            service.getFeaturedChannels();
            $rootScope.$apply();

            sinonExpect.calledOnce(channelHttpServiceStub.getChannels);
        });

        it('should return channels found', () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            channelHttpServiceStub.getChannels.returns($q.resolve(expected));

            service.getFeaturedChannels().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should attach provider game name to game name property', () => {

            const channels = [

                { provider_game_name: 'name_1' },
                { provider_game_name: 'name_2' },
                { provider_game_name: 'name_3' }
            ];

            const expected = [

                { provider_game_name: 'name_1', game_name: 'name_1' },
                { provider_game_name: 'name_2', game_name: 'name_2' },
                { provider_game_name: 'name_3', game_name: 'name_3' }
            ];

            channelHttpServiceStub.getChannels.returns($q.resolve(channels));

            service.getFeaturedChannels().then(result => {

                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should return empty collection when no channel found', () => {

            channelHttpServiceStub.getChannels.returns($q.resolve([]));

            service.getFeaturedChannels().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to retrieve channels', () => {

            channelHttpServiceStub.getChannels.returns($q.reject(new Error()));

            service.getFeaturedChannels().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });
    });

    describe('getHistories()', () => {

        it('should use view history http service to fetch data', () => {

            service.getHistories();

            sinonExpect.calledOnce(viewHistoryHttpServiceStub.getHistories);
        });

        it('should return view histories found sorted by timestamp in descending order', () => {

            const expected = [{ timestamp: 6 }, { timestamp: 4 }, { timestamp: 2 }];
            viewHistoryHttpServiceStub.getHistories.returns($q.resolve(expected));

            service.getHistories().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should return empty collection when no view history found', () => {

            viewHistoryHttpServiceStub.getHistories.returns($q.resolve([]));

            service.getHistories().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to retrieve view histories', () => {

            viewHistoryHttpServiceStub.getHistories.returns($q.reject(new Error()));

            service.getHistories().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });
    });
});
