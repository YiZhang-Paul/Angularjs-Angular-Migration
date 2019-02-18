import CoreModule from '../../../core.module.ajs';

import { stubViewHistoryHttpServiceNg1 } from '../../../../testing/stubs/custom/view-history-http.service.stub';

const module = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('view history manager service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let viewHistoryHttpStub;

    beforeEach(module('ngMaterial'));
    beforeEach(module(CoreModule));

    beforeEach('stubs setup', () => {

        viewHistoryHttpStub = stubViewHistoryHttpServiceNg1(module, inject);

        viewHistoryHttpStub.setupStub();
    });

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('viewHistoryManagerService');

        stub($rootScope, '$broadcast').callThrough();
    }));

    beforeEach('clear $locationChangeStart and $locationChangeSuccess broadcast', () => {

        $rootScope.$apply();
        $rootScope.$broadcast.resetHistory();
    });

    afterEach('general test teardown', () => {

        $rootScope.$broadcast.restore();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('cacheHistories()', () => {

        it('should use view history http service to fetch view histories', () => {

            service.cacheHistories();
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        });

        it('should cache view histories', () => {

            const expected = [{ id: 1 }, { id: 4 }, { id: 7 }];
            viewHistoryHttpStub.getHistories.returns($q.resolve(expected));

            service.cacheHistories();
            $rootScope.$apply();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        });

        it('should not overwrite cache when no view history found', () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            viewHistoryHttpStub.getHistories.returns($q.resolve([]));

            service.cacheHistories();
            $rootScope.$apply();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        });

        it('should not overwrite cache when failed to get view histories', () => {

            service.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = service.histories.slice();
            viewHistoryHttpStub.getHistories.returns($q.reject(new Error()));

            service.cacheHistories();
            $rootScope.$apply();

            expect(service.histories).to.deep.equal(expected);
            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        });

        it('should raise event when successfully cached view histories', () => {

            service.cacheHistories();
            $rootScope.$apply();

            sinonExpect.calledOnce($rootScope.$broadcast);
            sinonExpect.calledWith($rootScope.$broadcast, 'historyCached');
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

            sinonExpect.calledOnce(viewHistoryHttpStub.addHistory);
            sinonExpect.calledWith(viewHistoryHttpStub.addHistory, channel);
        });

        it('should cache view histories on success', () => {

            service.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryHttpStub.getHistories);
        });

        it('should raise event when successfully added history', () => {

            service.addHistory(channel);
            $rootScope.$apply();
            // caching view histories will also raise event
            sinonExpect.calledTwice($rootScope.$broadcast);
            sinonExpect.calledWith($rootScope.$broadcast, 'historyUpdated');
        });

        it('should not cache view histories on failure', () => {

            viewHistoryHttpStub.addHistory.returns($q.reject(new Error()));

            service.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.notCalled(viewHistoryHttpStub.getHistories);
        });

        it('should not raise event when failed to add history', () => {

            viewHistoryHttpStub.addHistory.returns($q.reject(new Error()));

            service.addHistory(channel).catch(() => null);
            $rootScope.$apply();

            sinonExpect.notCalled($rootScope.$broadcast);
        });

        it('should not throw error when failed to add history', () => {

            viewHistoryHttpStub.addHistory.returns($q.reject(new Error()));

            service.addHistory(channel);
            $rootScope.$apply();
        });
    });

    describe('deleteHistory()', () => {

        const id = 102;

        it('should use view history http service to delete view history', () => {

            service.deleteHistory(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryHttpStub.deleteHistory);
            sinonExpect.calledWith(viewHistoryHttpStub.deleteHistory, id);
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

            viewHistoryHttpStub.deleteHistory.returns($q.reject(new Error()));
            service.histories = [{ id: 1 }, { id: 2 }, { id }];
            const expected = service.histories.slice();

            service.deleteHistory(id);
            $rootScope.$apply();

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        });

        it('should not raise event when failed to delete view history', () => {

            viewHistoryHttpStub.deleteHistory.returns($q.reject(new Error()));

            service.deleteHistory(id);
            $rootScope.$apply();

            sinonExpect.notCalled($rootScope.$broadcast);
        });

        it('should not throw error when failed to delete view history', () => {

            viewHistoryHttpStub.deleteHistory.returns($q.reject(new Error()));

            service.deleteHistory(id);
            $rootScope.$apply();
        });
    });

    describe('clearHistories()', () => {

        it('should use view history http service to delete view histories', () => {

            service.clearHistories();
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryHttpStub.deleteHistories);
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
            viewHistoryHttpStub.deleteHistories.returns($q.reject(new Error()));

            service.clearHistories();
            $rootScope.$apply();

            expect(service.histories).is.not.empty;
            expect(service.histories).to.deep.equal(expected);
        });

        it('should not raise event on failure', () => {

            viewHistoryHttpStub.deleteHistories.returns($q.reject(new Error()));

            service.clearHistories();
            $rootScope.$apply();

            sinonExpect.notCalled($rootScope.$broadcast);
        });

        it('should not throw error when failed to delete histories', () => {

            viewHistoryHttpStub.deleteHistories.returns($q.reject(new Error()));

            service.clearHistories();
            $rootScope.$apply();
        });
    });
});
