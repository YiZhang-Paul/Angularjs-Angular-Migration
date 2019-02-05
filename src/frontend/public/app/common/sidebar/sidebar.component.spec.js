import CommonModule from '../common.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('sidebar component unit test', () => {

    let $q;
    let $rootScope;
    let component;

    let getBookmarksStub;
    let getFeaturedChannelsStub;
    let getHistoriesStub;
    let successStub;
    let errorStub;

    beforeEach(mockModule(CommonModule));

    beforeEach('mock sidebar service setup', mockModule($provide => {

        getBookmarksStub = stub();
        getFeaturedChannelsStub = stub();
        getHistoriesStub = stub();

        $provide.service('sidebarService', () => ({

            getBookmarks: getBookmarksStub,
            getFeaturedChannels: getFeaturedChannelsStub,
            getHistories: getHistoriesStub
        }));
    }));

    beforeEach('mock toastr service setup', inject($injector => {

        const toastr = $injector.get('toastr');
        successStub = stub(toastr, 'success');
        errorStub = stub(toastr, 'error');
    }));

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('sidebar');
    }));

    afterEach('general test teardown', () => {

        successStub.restore();
        errorStub.restore();
    });

    it('should resolve', () => {

        expect(component).is.not.null;
    });

    describe('$onInit()', () => {

        beforeEach('$onInit() test setup', () => {

            getBookmarksStub.returns($q.resolve([]));
            getFeaturedChannelsStub.returns($q.resolve([]));
            getHistoriesStub.returns($q.resolve([]));
        });

        it('should use sidebar service to fetch bookmark data', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(getBookmarksStub);
        });

        it('should load bookmarks on initialization', () => {

            const expected = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
            getBookmarksStub.returns($q.resolve(expected));

            component.$onInit();
            $rootScope.$apply();

            const result = component.badges.get('Followed Channels');

            expect(result).to.deep.equal(expected.slice(0, 3));
        });

        it('should use sidebar service to fetch channel data', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(getFeaturedChannelsStub);
        });

        it('should load featured channels on initialization', () => {

            const expected = [

                { id: 1, provider_game_name: 'name_1', game_name: 'name_1' },
                { id: 2, provider_game_name: 'name_2', game_name: 'name_2' },
                { id: 3, provider_game_name: 'name_3', game_name: 'name_3' },
                { id: 4, provider_game_name: 'name_4', game_name: 'name_4' }
            ];

            getFeaturedChannelsStub.returns($q.resolve(expected));

            component.$onInit();
            $rootScope.$apply();

            const result = component.badges.get('Featured Channels');

            expect(result).to.deep.equal(expected.slice(0, 3));
        });

        it('should use sidebar service to fetch view history data', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(getHistoriesStub);
        });

        it('should load view histories on initialization', () => {

            const expected = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
            getHistoriesStub.returns($q.resolve(expected));

            component.$onInit();
            $rootScope.$apply();

            const result = component.badges.get('View History');

            expect(result).to.deep.equal(expected.slice(0, 3));
        });

        it('should register followed channel event on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            getBookmarksStub.reset();
            getBookmarksStub.returns($q.resolve([]));

            $rootScope.$broadcast('followedChannel');

            sinonExpect.calledOnce(getBookmarksStub);
            sinonExpect.calledOnce(successStub);
        });

        it('should register unfollowed channel event on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            getBookmarksStub.reset();
            getBookmarksStub.returns($q.resolve([]));

            $rootScope.$broadcast('unfollowedChannel');

            sinonExpect.calledOnce(getBookmarksStub);
            sinonExpect.calledOnce(errorStub);
        });

        it('should register view history updated event on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            getHistoriesStub.reset();
            getHistoriesStub.returns($q.resolve([]));

            $rootScope.$broadcast('historyUpdated');

            sinonExpect.calledOnce(getHistoriesStub);
        });
    });
});
