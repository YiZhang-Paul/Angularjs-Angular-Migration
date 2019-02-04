import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('view history service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let addHistoryStub;
    let $broadcastStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock view history http service setup', mockModule($provide => {

        addHistoryStub = stub();

        $provide.service('viewHistoryHttpService', () => ({

            addHistory: addHistoryStub
        }));
    }));

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('viewHistoryService');

        $broadcastStub = stub($rootScope, '$broadcast').callThrough();
    }));

    afterEach('general test teardown', () => {

        $broadcastStub.restore();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('addHistory()', () => {

        const channel = { id: 5 };

        beforeEach('addHistory() test setup', () => {
            // clear $locationChangeStart and $locationChangeSuccess broadcast
            $rootScope.$apply();
            $broadcastStub.resetHistory();
        });

        it('should use view history http service to add history', () => {

            addHistoryStub.returns($q.resolve({}));

            service.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(addHistoryStub);
            sinonExpect.calledWith(addHistoryStub, channel);
        });

        it('should raise event when successfully added history', () => {

            addHistoryStub.returns($q.resolve({}));

            service.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce($broadcastStub);
            sinonExpect.calledWith($broadcastStub, 'historyUpdated');
        });

        it('should not raise event when failed to add history', () => {

            addHistoryStub.returns($q.reject(new Error()));

            service.addHistory(channel).catch(() => null);
            $rootScope.$apply();

            sinonExpect.notCalled($broadcastStub);
        });

        it('should not throw error when failed to add history', () => {

            addHistoryStub.returns($q.reject(new Error()));

            service.addHistory(channel).catch(() => {

                throw new Error();
            });

            $rootScope.$apply();
        });
    });
});
