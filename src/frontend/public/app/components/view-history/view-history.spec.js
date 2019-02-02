import SharedModule from '../../shared/shared.module';
import ComponentsModule from '../components.module';

import { excludeIndex } from '../../shared/utilities/utilities';

const mockModule = angular.mock.module;
const spy = sinon.spy;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('view history component unit test', () => {

    let getHistoriesStub;
    let deleteHistoryStub;
    let deleteHistoriesStub;
    let getGameStub;
    let getChannelsByGameIdStub;
    let goStub;
    let confirmSpy;
    let showStub;

    let q;
    let scope;
    let controller;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(ComponentsModule));

    beforeEach('test setup', inject(($injector, $controller) => {

        const historyService = $injector.get('viewHistoryHttpService');
        getHistoriesStub = stub(historyService, 'getHistories');
        deleteHistoryStub = stub(historyService, 'deleteHistory');
        deleteHistoriesStub = stub(historyService, 'deleteHistories');

        const gameService = $injector.get('gameHttpService');
        getGameStub = stub(gameService, 'getGame');

        const channelService = $injector.get('channelHttpService');
        getChannelsByGameIdStub = stub(channelService, 'getChannelsByGameId');

        const state = $injector.get('$state');
        goStub = stub(state, 'go');

        const dialog = $injector.get('$mdDialog');
        confirmSpy = spy(dialog, 'confirm');
        showStub = stub(dialog, 'show')

        q = $injector.get('$q');
        scope = $injector.get('$rootScope').$new();
        controller = $controller('ViewHistoryController', { $rootScope: scope });
    }));

    afterEach('test teardown', () => {

        getHistoriesStub.restore();
        deleteHistoryStub.restore();
        deleteHistoriesStub.restore();
        getGameStub.restore();
        getChannelsByGameIdStub.restore();
        goStub.restore();
        confirmSpy.restore();
        showStub.restore();
    });

    it('should resolve', () => {

        expect(controller).is.not.null;
    });

    describe('$onInit()', () => {

        it('should load view histories on initialization', () => {

            const expected = [{ id: 1 }, { id: 2 }, { id: 4 }];
            getHistoriesStub.returns(q.resolve(expected));

            controller.$onInit();
            scope.$apply();

            sinonExpect.calledOnce(getHistoriesStub);
            expect(controller.histories).to.deep.equal(expected);
        });
        //TODO: find a way to mute console.log in source code ONLY
        it('should default to empty collection when load view histories failed', () => {

            getHistoriesStub.returns(q.reject(new Error()));

            controller.$onInit();
            scope.$apply();

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

            getGameStub.returns(q.resolve(game));
            getChannelsByGameIdStub.returns(q.resolve([]));
        });

        it('should use game http service to fetch game data', () => {

            controller.toChannelsView(id);
            scope.$apply();

            sinonExpect.calledOnce(getGameStub);
        });

        it('should use channel http service to fetch channel data', () => {

            controller.toChannelsView(id);
            scope.$apply();

            sinonExpect.calledOnce(getChannelsByGameIdStub);
        });

        it('should change route with correct route parameters', () => {

            const name = 'random-game-name-5';
            const channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = { game, name, channels };
            getChannelsByGameIdStub.returns(q.resolve(channels));

            controller.toChannelsView(id);
            scope.$apply();

            sinonExpect.calledOnce(goStub);
            sinonExpect.calledWith(goStub, 'channels', expected);
        });

        it('should not throw on error', () => {

            getGameStub.returns(q.reject(new Error()));
            getChannelsByGameIdStub.returns(q.reject(new Error()));

            controller.toChannelsView(id);
            scope.$apply();
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
            deleteHistoryStub.returns(q.resolve({}));

            controller.deleteHistory({ id });
            scope.$apply();

            sinonExpect.calledOnce(deleteHistoryStub);
            sinonExpect.calledWith(deleteHistoryStub, id);
            expect(controller.histories).to.deep.equal(expected);
        });

        it('should not delete history when history is not found', () => {

            const id = -1;
            const expected = controller.histories.slice();

            controller.deleteHistory({ id });
            scope.$apply();

            sinonExpect.notCalled(deleteHistoryStub);
            expect(controller.histories).to.deep.equal(expected);
        });

        it('should not throw on deletion error', () => {

            const id = controller.histories[1].id;
            deleteHistoryStub.returns(q.reject(new Error()));

            controller.deleteHistory({ id });
            scope.$apply();

            sinonExpect.calledOnce(deleteHistoryStub);
        });
    });

    describe('clearHistories()', () => {

        beforeEach('clearHistories() test setup', () => {

            controller.histories = [{ id: 1 }, { id: 2 }, { id: 4 }];
        });

        it('should use view history http service to delete histories', () => {

            deleteHistoriesStub.returns(q.resolve({}));

            controller.clearHistories();

            sinonExpect.calledOnce(deleteHistoriesStub);
        });

        it('should clear cached histories when deletion is successful', () => {

            const oldCache = controller.histories.slice();
            deleteHistoriesStub.returns(q.resolve({}));

            controller.clearHistories();
            scope.$apply();

            expect(oldCache).is.not.empty;
            expect(controller.histories).to.be.empty;
        });

        it('should not clear cached histories when deletion failed', () => {

            const expected = controller.histories.slice();
            deleteHistoriesStub.returns(q.reject(new Error()));

            controller.clearHistories();
            scope.$apply();

            expect(expected).is.not.empty;
            expect(controller.histories).to.deep.equal(expected);
        });
    });

    describe('confirmClearHistories()', () => {

        beforeEach('confirmClearHistories() test setup', () => {

            deleteHistoriesStub.returns(q.resolve({}));
            showStub.returns(q.resolve({}));
        });

        it('should show confirmation dialog', () => {

            controller.confirmClearHistories({});
            scope.$apply();

            sinonExpect.calledOnce(confirmSpy);
            sinonExpect.calledOnce(showStub);
        });

        it('should bind confirmation dialog to correct event', () => {

            const expected = { payload: 'random_payload' };

            controller.confirmClearHistories(expected);
            scope.$apply();

            const result = showStub.args[0][0]._options.targetEvent;

            expect(result).to.deep.equal(expected);
        });

        it('should clear histories on confirmation', () => {

            controller.confirmClearHistories({});
            scope.$apply();

            sinonExpect.calledOnce(deleteHistoriesStub);
        });

        it('should not clear histories on cancellation', () => {

            showStub.returns(q.reject({}));

            controller.confirmClearHistories({});
            scope.$apply();

            sinonExpect.notCalled(deleteHistoriesStub);
        });
    });
});
