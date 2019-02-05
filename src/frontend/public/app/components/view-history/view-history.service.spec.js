import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const spy = sinon.spy;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('view history service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let getHistoriesStub;
    let addHistoryStub;
    let deleteHistoryStub;
    let deleteHistoriesStub;
    let confirmSpy;
    let showStub;
    let $broadcastStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock view history http service setup', mockModule($provide => {

        getHistoriesStub = stub();
        addHistoryStub = stub();
        deleteHistoryStub = stub();
        deleteHistoriesStub = stub();

        $provide.service('viewHistoryHttpService', () => ({

            getHistories: getHistoriesStub,
            addHistory: addHistoryStub,
            deleteHistory: deleteHistoryStub,
            deleteHistories: deleteHistoriesStub
        }));
    }));

    beforeEach('mock $mdDialog setup', inject($injector => {

        const $mdDialog = $injector.get('$mdDialog');
        confirmSpy = spy($mdDialog, 'confirm');
        showStub = stub($mdDialog, 'show');
    }));

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('viewHistoryService');

        $broadcastStub = stub($rootScope, '$broadcast').callThrough();
    }));

    afterEach('general test teardown', () => {

        $broadcastStub.restore();
        confirmSpy.restore();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getHistories()', () => {

        it('should use view history http service to get view histories', () => {

            getHistoriesStub.returns($q.resolve([]));

            service.getHistories();
            $rootScope.$apply();

            sinonExpect.calledOnce(getHistoriesStub);
        });

        it('should return view histories found', () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            getHistoriesStub.returns($q.resolve(expected));

            service.getHistories().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            $rootScope.$apply();
        });

        it('should return empty collection when failed to get view histories', () => {

            getHistoriesStub.returns($q.reject(new Error()));

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
            getHistoriesStub.returns($q.resolve(expected));

            service.cacheHistories();
            $rootScope.$apply();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(getHistoriesStub);
        });

        it('should not overwrite cache when no view history found', () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            getHistoriesStub.returns($q.resolve([]));

            service.cacheHistories();
            $rootScope.$apply();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(getHistoriesStub);
        });

        it('should not overwrite cache when failed to get view histories', () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            getHistoriesStub.returns($q.reject(new Error()));

            service.cacheHistories();
            $rootScope.$apply();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(getHistoriesStub);
        });
    });

    describe('addHistory()', () => {

        const channel = { id: 5 };
        // TODO: move to top
        beforeEach('addHistory() test setup', () => {
            // clear $locationChangeStart and $locationChangeSuccess broadcast
            $rootScope.$apply();
            $broadcastStub.resetHistory();
            addHistoryStub.returns($q.resolve({}));
            getHistoriesStub.returns($q.resolve([]));
        });

        it('should use view history http service to add history', () => {

            service.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(addHistoryStub);
            sinonExpect.calledWith(addHistoryStub, channel);
        });

        it('should cache view histories on success', () => {

            service.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(getHistoriesStub);
        });

        it('should raise event when successfully added history', () => {

            service.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce($broadcastStub);
            sinonExpect.calledWith($broadcastStub, 'historyUpdated');
        });

        it('should not cache view histories on failure', () => {

            addHistoryStub.returns($q.reject(new Error()));

            service.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.notCalled(getHistoriesStub);
        });

        it('should not raise event when failed to add history', () => {

            addHistoryStub.returns($q.reject(new Error()));

            service.addHistory(channel).catch(() => null);
            $rootScope.$apply();

            sinonExpect.notCalled($broadcastStub);
        });

        it('should not throw error when failed to add history', () => {

            addHistoryStub.returns($q.reject(new Error()));

            service.addHistory(channel);
            $rootScope.$apply();
        });
    });

    describe('deleteHistory()', () => {

        const id = 102;

        beforeEach('deleteHistory() test setup', () => {
            // clear $locationChangeStart and $locationChangeSuccess broadcast
            $rootScope.$apply();
            $broadcastStub.resetHistory();
            deleteHistoryStub.returns($q.resolve({}));
        });

        it('should use view history http service to delete view history', () => {

            service.deleteHistory(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(deleteHistoryStub);
            sinonExpect.calledWith(deleteHistoryStub, id);
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

            sinonExpect.calledOnce($broadcastStub);
            sinonExpect.calledWith($broadcastStub, 'historyRemoved');
        });

        it('should not remove cached view history on failure', () => {

            deleteHistoryStub.returns($q.reject(new Error()));
            service.histories = [{ id: 1 }, { id: 2 }, { id }];
            const expected = service.histories.slice();

            service.deleteHistory(id);
            $rootScope.$apply();

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        });

        it('should not raise event when failed to delete view history', () => {

            deleteHistoryStub.returns($q.reject(new Error()));

            service.deleteHistory(id);
            $rootScope.$apply();

            sinonExpect.notCalled($broadcastStub);
        });

        it('should not throw error when failed to delete view history', () => {

            deleteHistoryStub.returns($q.reject(new Error()));

            service.deleteHistory(id);
            $rootScope.$apply();
        });
    });

    describe('showClearHistoriesDialog()', () => {

        it('should show confirmation dialog', () => {

            service.showClearHistoriesDialog({});
            $rootScope.$apply();

            sinonExpect.calledOnce(confirmSpy);
            sinonExpect.calledOnce(showStub);
        });

        it('should bind confirmation dialog to correct event', () => {

            const expected = { payload: 'random_payload' };

            service.showClearHistoriesDialog(expected);
            $rootScope.$apply();

            const result = showStub.args[0][0]._options.targetEvent;

            expect(result).to.deep.equal(expected);
        });
    });

    describe('clearHistories()', () => {

        beforeEach('clearHistories() test setup', () => {
            // clear $locationChangeStart and $locationChangeSuccess broadcast
            $rootScope.$apply();
            $broadcastStub.resetHistory();
            deleteHistoriesStub.returns($q.resolve({}));
        });

        it('should use view history http service to delete view histories', () => {

            service.clearHistories();
            $rootScope.$apply();

            sinonExpect.calledOnce(deleteHistoriesStub);
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

            sinonExpect.calledOnce($broadcastStub);
            sinonExpect.calledWith($broadcastStub, 'historyCleared');
        });

        it('should not clear cache on failure', () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            deleteHistoriesStub.returns($q.reject(new Error()));

            service.clearHistories();
            $rootScope.$apply();

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        });

        it('should not raise event on failure', () => {

            deleteHistoriesStub.returns($q.reject(new Error()));

            service.clearHistories();
            $rootScope.$apply();

            sinonExpect.notCalled($broadcastStub);
        });

        it('should not throw error when failed to delete histories', () => {

            deleteHistoriesStub.returns($q.reject(new Error()));

            service.clearHistories();
            $rootScope.$apply();
        });
    });
});
