import SharedModule from '../../shared/shared.module';
import ComponentsModule from '../components.module';

import { excludeIndex } from '../../shared/utilities/utilities';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('view history component unit test', () => {

    let getHistoriesStub;
    let deleteHistoryStub;
    let deleteHistoriesStub;

    let q;
    let scope;
    //TODO: remove when fully refactored
    let httpBackend;
    let controller;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(ComponentsModule));

    beforeEach('test setup', inject(($injector, $controller) => {

        const historyService = $injector.get('viewHistoryHttpService');
        getHistoriesStub = stub(historyService, 'getHistories');
        deleteHistoryStub = stub(historyService, 'deleteHistory');
        deleteHistoriesStub = stub(historyService, 'deleteHistories');

        q = $injector.get('$q');
        scope = $injector.get('$rootScope');
        httpBackend = $injector.get('$httpBackend');
        controller = $controller('ViewHistoryController');
    }));

    afterEach('test teardown', () => {

        getHistoriesStub.restore();
        deleteHistoryStub.restore();
        deleteHistoriesStub.restore();
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(controller).is.not.null;
    });

    it('should load view histories on instantiation', () => {

        const expected = [{ id: 1 }, { id: 2 }, { id: 4 }];
        getHistoriesStub.returns(q.resolve(expected));

        controller.$onInit();
        scope.$apply();

        sinonExpect.calledOnce(getHistoriesStub);
        expect(controller.histories).to.deep.equal(expected);
    });

    it('should default to empty collection when load histories failed', () => {

        getHistoriesStub.returns(q.reject(new Error()));

        controller.$onInit();
        scope.$apply();

        expect(Array.isArray(controller.histories)).to.be.true;
        expect(controller.histories).to.be.empty;
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

            sinonExpect.calledOnce(deleteHistoryStub);
            sinonExpect.calledWith(deleteHistoryStub, id);
            expect(controller.histories).to.deep.equal(expected);
        });

        it('should not delete history when history is not found', () => {

            const id = -1;
            const expected = controller.histories.slice();

            controller.deleteHistory({ id });

            sinonExpect.notCalled(deleteHistoryStub);
            expect(controller.histories).to.deep.equal(expected);
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
});
