import SharedModule from '../../shared/shared.module';
import ComponentsModule from '../components.module';

import { excludeIndex } from '../../shared/utilities/utilities';

const mockModule = angular.mock.module;
const spy = sinon.spy;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('view history component unit test', () => {

    let $q;
    let $rootScope;
    let controller;

    let getHistoriesStub;
    let deleteHistoryStub;
    let deleteHistoriesStub;
    let getGameStub;
    let getChannelsByGameIdStub;
    let goStub;
    let confirmSpy;
    let showStub;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock view history http service setup', mockModule($provide => {

        getHistoriesStub = stub();
        deleteHistoryStub = stub();
        deleteHistoriesStub = stub();

        $provide.service('viewHistoryHttpService', () => ({

            getHistories: getHistoriesStub,
            deleteHistory: deleteHistoryStub,
            deleteHistories: deleteHistoriesStub
        }));
    }));

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

    beforeEach('mock $state setup', mockModule($provide => {

        goStub = stub();

        $provide.service('$state', () => ({

            go: goStub
        }));
    }));

    beforeEach('mock $mdDialog setup', inject($injector => {

        const $mdDialog = $injector.get('$mdDialog');
        confirmSpy = spy($mdDialog, 'confirm');
        showStub = stub($mdDialog, 'show');
    }));

    beforeEach('general test setup', inject(($injector, $controller) => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        controller = $controller('ViewHistoryController');
    }));

    afterEach('general test teardown', () => {

        confirmSpy.restore();
    });

    it('should resolve', () => {

        expect(controller).is.not.null;
    });

    describe('$onInit()', () => {

        it('should load view histories on initialization', () => {

            const expected = [{ id: 1 }, { id: 2 }, { id: 4 }];
            getHistoriesStub.returns($q.resolve(expected));

            controller.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(getHistoriesStub);
            expect(controller.histories).to.deep.equal(expected);
        });

        it('should default to empty collection when load view histories failed', () => {

            getHistoriesStub.returns($q.reject(new Error()));

            controller.$onInit();
            $rootScope.$apply();

            expect(Array.isArray(controller.histories)).to.be.true;
            expect(controller.histories).to.be.empty;
        });
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

            controller.toChannelsView(id);
            $rootScope.$apply();

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

        beforeEach('deleteHistory() test setup', () => {

            controller.histories = [{ id: 1 }, { id: 2 }, { id: 4 }];
        });

        it('should delete history when history is found', () => {

            const index = 1;
            const id = controller.histories[index].id;
            const expected = excludeIndex(controller.histories, index);
            deleteHistoryStub.returns($q.resolve({}));

            controller.deleteHistory({ id });
            $rootScope.$apply();

            sinonExpect.calledOnce(deleteHistoryStub);
            sinonExpect.calledWith(deleteHistoryStub, id);
            expect(controller.histories).to.deep.equal(expected);
        });

        it('should not delete history when history is not found', () => {

            const id = -1;
            const expected = controller.histories.slice();

            controller.deleteHistory({ id });
            $rootScope.$apply();

            sinonExpect.notCalled(deleteHistoryStub);
            expect(controller.histories).to.deep.equal(expected);
        });

        it('should not throw on deletion error', () => {

            const id = controller.histories[1].id;
            deleteHistoryStub.returns($q.reject(new Error()));

            controller.deleteHistory({ id });
            $rootScope.$apply();

            sinonExpect.calledOnce(deleteHistoryStub);
        });
    });

    describe('clearHistories()', () => {

        beforeEach('clearHistories() test setup', () => {

            controller.histories = [{ id: 1 }, { id: 2 }, { id: 4 }];
        });

        it('should use view history http service to delete histories', () => {

            deleteHistoriesStub.returns($q.resolve({}));

            controller.clearHistories();
            $rootScope.$apply();

            sinonExpect.calledOnce(deleteHistoriesStub);
        });

        it('should clear cached histories when deletion is successful', () => {

            const oldCache = controller.histories.slice();
            deleteHistoriesStub.returns($q.resolve({}));

            controller.clearHistories();
            $rootScope.$apply();

            expect(oldCache).is.not.empty;
            expect(controller.histories).to.be.empty;
        });

        it('should not clear cached histories when deletion failed', () => {

            const expected = controller.histories.slice();
            deleteHistoriesStub.returns($q.reject(new Error()));

            controller.clearHistories();
            $rootScope.$apply();

            expect(expected).is.not.empty;
            expect(controller.histories).to.deep.equal(expected);
        });
    });

    describe('confirmClearHistories()', () => {

        beforeEach('confirmClearHistories() test setup', () => {

            deleteHistoriesStub.returns($q.resolve({}));
            showStub.returns($q.resolve({}));
        });

        it('should show confirmation dialog', () => {

            controller.confirmClearHistories({});
            $rootScope.$apply();

            sinonExpect.calledOnce(confirmSpy);
            sinonExpect.calledOnce(showStub);
        });

        it('should bind confirmation dialog to correct event', () => {

            const expected = { payload: 'random_payload' };

            controller.confirmClearHistories(expected);
            $rootScope.$apply();

            const result = showStub.args[0][0]._options.targetEvent;

            expect(result).to.deep.equal(expected);
        });

        it('should clear histories on confirmation', () => {

            controller.confirmClearHistories({});
            $rootScope.$apply();

            sinonExpect.calledOnce(deleteHistoriesStub);
        });

        it('should not clear histories on cancellation', () => {

            showStub.returns($q.reject({}));

            controller.confirmClearHistories({});
            $rootScope.$apply();

            sinonExpect.notCalled(deleteHistoriesStub);
        });
    });
});
