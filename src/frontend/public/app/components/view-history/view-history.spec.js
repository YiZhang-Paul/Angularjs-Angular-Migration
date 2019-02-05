import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('view history component unit test', () => {

    let $q;
    let $rootScope;
    let controller;

    let cacheHistoriesStub;
    let deleteHistoryStub;
    let showClearHistoriesDialogStub;
    let clearHistoriesStub;
    let getGameStub;
    let getChannelsByGameIdStub;
    let joinTextStub;
    let goStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock game http service setup', mockModule($provide => {

        getGameStub = stub();

        $provide.service('gameHttpService', () => ({

            getGame: getGameStub
        }));
    }));

    beforeEach('mock channel http service setup', mockModule($provide => {

        getChannelsByGameIdStub = stub();

        $provide.service('channelHttpService', () => ({

            getChannelsByGameId: getChannelsByGameIdStub
        }));
    }));

    beforeEach('mock view history service setup', mockModule($provide => {

        cacheHistoriesStub = stub();
        deleteHistoryStub = stub();
        showClearHistoriesDialogStub = stub();
        clearHistoriesStub = stub();

        $provide.service('viewHistoryService', () => ({

            cacheHistories: cacheHistoriesStub,
            deleteHistory: deleteHistoryStub,
            showClearHistoriesDialog: showClearHistoriesDialogStub,
            clearHistories: clearHistoriesStub
        }));
    }));

    beforeEach('mock generic utility service setup', mockModule($provide => {

        joinTextStub = stub();

        $provide.service('genericUtilityService', () => ({

            joinText: joinTextStub
        }));
    }));

    beforeEach('mock $state setup', mockModule($provide => {

        goStub = stub();

        $provide.service('$state', () => ({

            go: goStub
        }));
    }));

    beforeEach('general test setup', inject(($injector, $controller) => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        controller = $controller('ViewHistoryController');
    }));

    it('should resolve', () => {

        expect(controller).is.not.null;
    });

    describe('$onInit()', () => {

        it('should cache view histories on initialization', () => {

            controller.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(cacheHistoriesStub);
        });
    });

    describe('histories', () => {

        it('should reference cache from view history service', inject($injector => {

            const service = $injector.get('viewHistoryService');
            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];

            expect(controller.histories).to.deep.equal(service.histories);
        }));
    });

    describe('isStaticImage()', () => {

        it('should return true when file is not in mp4 or m4v format', () => {

            expect(controller.isStaticImage('file.png')).to.be.true;
        });

        it('should return false for mp4 format', () => {

            expect(controller.isStaticImage('file.mp4')).to.be.false;
        });

        it('should return false for m4v format', () => {

            expect(controller.isStaticImage('file.m4v')).to.be.false;
        });
    });

    describe('toChannelsView()', () => {

        const id = 55;
        const game = { name: 'random game name 5' };

        beforeEach('toChannelsView() test setup', () => {

            getGameStub.returns($q.resolve(game));
            getChannelsByGameIdStub.returns($q.resolve([]));
            joinTextStub.returns('');
        });

        it('should use game http service to fetch game data', () => {

            controller.toChannelsView(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(getGameStub);
        });

        it('should use channel http service to fetch channel data', () => {

            controller.toChannelsView(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(getChannelsByGameIdStub);
        });

        it('should change route with correct route parameters', () => {

            const name = 'random-game-name-5';
            const channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = { game, name, channels };
            getChannelsByGameIdStub.returns($q.resolve(channels));
            joinTextStub.returns(name);

            controller.toChannelsView(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(joinTextStub);
            sinonExpect.calledOnce(goStub);
            sinonExpect.calledWith(goStub, 'channels', expected);
        });

        it('should not throw on error', () => {

            getGameStub.returns($q.reject(new Error()));
            getChannelsByGameIdStub.returns($q.reject(new Error()));

            controller.toChannelsView(id);
            $rootScope.$apply();
        });
    });

    describe('deleteHistory()', () => {

        const id = 55;

        it('should use view history service to delete view history', () => {

            controller.deleteHistory({ id });
            $rootScope.$apply();

            sinonExpect.calledOnce(deleteHistoryStub);
            sinonExpect.calledWith(deleteHistoryStub, id);
        });
    });

    describe('confirmClearHistories()', () => {

        beforeEach('confirmClearHistories() test setup', () => {

            showClearHistoriesDialogStub.returns($q.resolve({}));
            clearHistoriesStub.returns($q.resolve({}));
        });

        it('should show confirmation dialog', () => {

            const expected = { payload: 'random_payload' };

            controller.confirmClearHistories(expected);
            $rootScope.$apply();

            sinonExpect.calledOnce(showClearHistoriesDialogStub);
            sinonExpect.calledWith(showClearHistoriesDialogStub, expected);
        });

        it('should use view history service to delete view histories when user confirms deletion', () => {

            controller.confirmClearHistories({});
            $rootScope.$apply();

            sinonExpect.calledOnce(clearHistoriesStub);
        });

        it('should not delete view histories when user cancels deletion', () => {

            showClearHistoriesDialogStub.returns($q.reject(new Error()));

            controller.confirmClearHistories({});
            $rootScope.$apply();

            sinonExpect.notCalled(clearHistoriesStub);
        });

        it('should not throw error when user cancels deletion', () => {

            showClearHistoriesDialogStub.returns($q.reject(new Error()));

            controller.confirmClearHistories({});
            $rootScope.$apply();
        });
    });
});
