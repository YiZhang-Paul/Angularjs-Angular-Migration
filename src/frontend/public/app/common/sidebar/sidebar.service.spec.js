import SharedModule from '../../shared/shared.module';
import CommonModule from '../common.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('sidebar service unit test', () => {

    let getHistoriesStub;

    let q;
    //TODO: remove when fully refactored
    let httpBackend;
    let service;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(CommonModule));

    beforeEach('test setup', inject($injector => {

        const historyService = $injector.get('viewHistoryHttpService');
        getHistoriesStub = stub(historyService, 'getHistories');

        q = $injector.get('$q');
        httpBackend = $injector.get('$httpBackend');
        service = $injector.get('sidebarService');
    }));

    afterEach('test teardown', () => {

        getHistoriesStub.restore();
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getHistories()', () => {

        it('should use view history http service to fetch data', () => {

            getHistoriesStub.returns(q.resolve([]));

            service.getHistories().then(() => {

                sinonExpect.calledOnce(getHistoriesStub);
            });
        });

        it('should return view histories found sorted by timestamp in descending order', () => {

            const expected = [{ timestamp: 6 }, { timestamp: 4 }, { timestamp: 2 }];
            getHistoriesStub.returns(q.resolve(expected));

            service.getHistories().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });
        });

        it('should return empty collection when no view history found', () => {

            getHistoriesStub.returns(q.resolve([]));

            service.getHistories().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });
        });

        it('should return empty collection when failed to retrieve histories', () => {

            getHistoriesStub.returns(q.reject(new Error()));

            service.getHistories().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });
        });
    });
});
