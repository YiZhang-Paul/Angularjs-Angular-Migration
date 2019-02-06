import ComponentsModule from '../components.module';

import { mockViewHistoryHttpService } from '../../../testing/stubs/view-history-http.service.stub';

const mockModule = angular.mock.module;
const spy = sinon.spy;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('view history service unit test', () => {

    let $q;
    let $mdDialog;
    let $rootScope;
    let service;

    let viewHistoryHttpServiceStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mocks setup', () => {

        viewHistoryHttpServiceStub = mockViewHistoryHttpService(mockModule, inject);
        viewHistoryHttpServiceStub.initializeMock();
    });

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $mdDialog = $injector.get('$mdDialog');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('viewHistoryService');

        spy($mdDialog, 'confirm');
        stub($mdDialog, 'show');
        stub($rootScope, '$broadcast').callThrough();
    }));

    beforeEach('clear $locationChangeStart and $locationChangeSuccess broadcast', () => {

        $rootScope.$apply();
        $rootScope.$broadcast.resetHistory();
    });

    afterEach('general test teardown', () => {

        $mdDialog.confirm.restore();
        $mdDialog.show.restore();
        $rootScope.$broadcast.restore();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getHistories()', () => {

        it('should use view history http service to get view histories', () => {

            service.getHistories();
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryHttpServiceStub.getHistories);
        });

        it('should return view histories found', () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            viewHistoryHttpServiceStub.getHistories.returns($q.resolve(expected));

            service.getHistories().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to get view histories', () => {

            viewHistoryHttpServiceStub.getHistories.returns($q.reject(new Error()));

            service.getHistories().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            $rootScope.$apply();
        });
    });

    describe('cacheHistories()', () => {

        it('should cache view histories', () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            viewHistoryHttpServiceStub.getHistories.returns($q.resolve(expected));

            service.cacheHistories();
            $rootScope.$apply();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(viewHistoryHttpServiceStub.getHistories);
        });

        it('should not overwrite cache when no view history found', () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            viewHistoryHttpServiceStub.getHistories.returns($q.resolve([]));

            service.cacheHistories();
            $rootScope.$apply();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(viewHistoryHttpServiceStub.getHistories);
        });

        it('should not overwrite cache when failed to get view histories', () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            viewHistoryHttpServiceStub.getHistories.returns($q.reject(new Error()));

            service.cacheHistories();
            $rootScope.$apply();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(viewHistoryHttpServiceStub.getHistories);
        });
    });

    describe('addHistory()', () => {

        let channel;

        beforeEach('addHistory() test setup', () => {

            channel = { id: 5 };
        });

        it('should use view history http service to add history', () => {

            service.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryHttpServiceStub.addHistory);
            sinonExpect.calledWith(viewHistoryHttpServiceStub.addHistory, channel);
        });

        it('should cache view histories on success', () => {

            service.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryHttpServiceStub.getHistories);
        });

        it('should raise event when successfully added history', () => {

            service.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce($rootScope.$broadcast);
            sinonExpect.calledWith($rootScope.$broadcast, 'historyUpdated');
        });

        it('should not cache view histories on failure', () => {

            viewHistoryHttpServiceStub.addHistory.returns($q.reject(new Error()));

            service.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.notCalled(viewHistoryHttpServiceStub.getHistories);
        });

        it('should not raise event when failed to add history', () => {

            viewHistoryHttpServiceStub.addHistory.returns($q.reject(new Error()));

            service.addHistory(channel).catch(() => null);
            $rootScope.$apply();

            sinonExpect.notCalled($rootScope.$broadcast);
        });

        it('should not throw error when failed to add history', () => {

            viewHistoryHttpServiceStub.addHistory.returns($q.reject(new Error()));

            service.addHistory(channel);
            $rootScope.$apply();
        });
    });

    describe('deleteHistory()', () => {

        const id = 102;

        it('should use view history http service to delete view history', () => {

            service.deleteHistory(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryHttpServiceStub.deleteHistory);
            sinonExpect.calledWith(viewHistoryHttpServiceStub.deleteHistory, id);
        });

        it('should remove cached view history on success', () => {

            service.histories = [{ id: 1 }, { id: 2 }, { id }];
            const expected = service.histories.slice(0, -1);

            service.deleteHistory(id);
            $rootScope.$apply();

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        });

        it('should raise event when successfully deleted view history', () => {

            service.deleteHistory(id);
            $rootScope.$apply();

            sinonExpect.calledOnce($rootScope.$broadcast);
            sinonExpect.calledWith($rootScope.$broadcast, 'historyRemoved');
        });

        it('should not remove cached view history on failure', () => {

            viewHistoryHttpServiceStub.deleteHistory.returns($q.reject(new Error()));
            service.histories = [{ id: 1 }, { id: 2 }, { id }];
            const expected = service.histories.slice();

            service.deleteHistory(id);
            $rootScope.$apply();

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        });

        it('should not raise event when failed to delete view history', () => {

            viewHistoryHttpServiceStub.deleteHistory.returns($q.reject(new Error()));

            service.deleteHistory(id);
            $rootScope.$apply();

            sinonExpect.notCalled($rootScope.$broadcast);
        });

        it('should not throw error when failed to delete view history', () => {

            viewHistoryHttpServiceStub.deleteHistory.returns($q.reject(new Error()));

            service.deleteHistory(id);
            $rootScope.$apply();
        });
    });

    describe('showClearHistoriesDialog()', () => {

        it('should show confirmation dialog', () => {

            service.showClearHistoriesDialog({});
            $rootScope.$apply();

            sinonExpect.calledOnce($mdDialog.confirm);
            sinonExpect.calledOnce($mdDialog.show);
        });

        it('should bind confirmation dialog to correct event', () => {

            const expected = { payload: 'random_payload' };

            service.showClearHistoriesDialog(expected);
            $rootScope.$apply();

            const result = $mdDialog.show.args[0][0]._options.targetEvent;

            expect(result).to.deep.equal(expected);
        });
    });

    describe('clearHistories()', () => {

        it('should use view history http service to delete view histories', () => {

            service.clearHistories();
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryHttpServiceStub.deleteHistories);
        });

        it('should clear cache on success', () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];

            service.clearHistories();
            $rootScope.$apply();

            expect(Array.isArray(service.histories)).to.be.true;
            expect(service.histories).to.be.empty;
        });

        it('should raise event on success', () => {

            service.clearHistories();
            $rootScope.$apply();

            sinonExpect.calledOnce($rootScope.$broadcast);
            sinonExpect.calledWith($rootScope.$broadcast, 'historyCleared');
        });

        it('should not clear cache on failure', () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            viewHistoryHttpServiceStub.deleteHistories.returns($q.reject(new Error()));

            service.clearHistories();
            $rootScope.$apply();

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        });

        it('should not raise event on failure', () => {

            viewHistoryHttpServiceStub.deleteHistories.returns($q.reject(new Error()));

            service.clearHistories();
            $rootScope.$apply();

            sinonExpect.notCalled($rootScope.$broadcast);
        });

        it('should not throw error when failed to delete histories', () => {

            viewHistoryHttpServiceStub.deleteHistories.returns($q.reject(new Error()));

            service.clearHistories();
            $rootScope.$apply();
        });
    });
});
