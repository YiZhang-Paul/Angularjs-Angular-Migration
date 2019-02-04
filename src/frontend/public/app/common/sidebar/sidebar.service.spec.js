import SharedModule from '../../shared/shared.module';
import CommonModule from '../common.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('sidebar service unit test', () => {

    let getBookmarksStub;
    let getChannelsStub;
    let getHistoriesStub;

    let $q;
    let $rootScope;
    let service;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(CommonModule));

    beforeEach('mock bookmark http service setup', mockModule($provide => {

        getBookmarksStub = stub();

        $provide.service('bookmarkHttpService', () => ({

            getBookmarks: getBookmarksStub
        }));
    }));

    beforeEach('mock channel http service setup', mockModule($provide => {

        getChannelsStub = stub();

        $provide.service('channelHttpService', () => ({

            getChannels: getChannelsStub
        }));
    }));

    beforeEach('mock view history http service setup', mockModule($provide => {

        getHistoriesStub = stub();

        $provide.service('viewHistoryHttpService', () => ({

            getHistories: getHistoriesStub
        }));
    }));

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

            getBookmarksStub.returns($q.resolve([]));

            service.getBookmarks();

            sinonExpect.calledOnce(getBookmarksStub);
        });

        it('should return bookmarks found', () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            getBookmarksStub.returns($q.resolve(expected));

            service.getBookmarks().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should return empty collection when no bookmark found', () => {

            getBookmarksStub.returns($q.resolve([]));

            service.getBookmarks().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to retrieve bookmarks', () => {

            getBookmarksStub.returns($q.reject(new Error()));

            service.getBookmarks().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });
    });

    describe('getFeaturedChannels()', () => {

        it('should use channel http service to fetch data', () => {

            getChannelsStub.returns($q.resolve([]));

            service.getFeaturedChannels();
            $rootScope.$apply();

            sinonExpect.calledOnce(getChannelsStub);
        });

        it('should return channels found', () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            getChannelsStub.returns($q.resolve(expected));

            service.getFeaturedChannels().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should return empty collection when no channel found', () => {

            getChannelsStub.returns($q.resolve([]));

            service.getFeaturedChannels().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to retrieve channels', () => {

            getChannelsStub.returns($q.reject(new Error()));

            service.getFeaturedChannels().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });
    });

    describe('getHistories()', () => {

        it('should use view history http service to fetch data', () => {

            getHistoriesStub.returns($q.resolve([]));

            service.getHistories();

            sinonExpect.calledOnce(getHistoriesStub);
        });

        it('should return view histories found sorted by timestamp in descending order', () => {

            const expected = [{ timestamp: 6 }, { timestamp: 4 }, { timestamp: 2 }];
            getHistoriesStub.returns($q.resolve(expected));

            service.getHistories().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should return empty collection when no view history found', () => {

            getHistoriesStub.returns($q.resolve([]));

            service.getHistories().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to retrieve view histories', () => {

            getHistoriesStub.returns($q.reject(new Error()));

            service.getHistories().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });
    });
});
