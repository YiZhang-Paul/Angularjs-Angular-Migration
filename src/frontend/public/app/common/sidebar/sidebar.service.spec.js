import SharedModule from '../../shared/shared.module';
import CommonModule from '../common.module';

const mockModule = angular.mock.module;

context('sidebar service unit test', () => {

    let httpBackend;
    let service;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(CommonModule));

    beforeEach('test setup', inject($injector => {

        httpBackend = $injector.get('$httpBackend');
        service = $injector.get('sidebarService');
    }));

    afterEach('test teardown', () => {

        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('getHistories()', () => {

        it('should return view histories found sorted by timestamp in descending order', () => {

            const histories = [{ timestamp: 2 }, { timestamp: 4 }, { timestamp: 6 }];
            const expected = histories.slice().reverse();
            httpBackend.whenGET(/.*/).respond(histories);

            service.getHistories().then(result => {

                expect(result).is.not.empty;
                expect(result).to.deep.equal(expected);
            });

            httpBackend.flush();
        });

        it('should return empty collection when no view history found', () => {

            httpBackend.whenGET(/.*/).respond([]);

            service.getHistories().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            httpBackend.flush();
        });

        it('should return empty collection when failed to retrieve histories', () => {

            const expected = 400;
            httpBackend.whenGET(/.*/).respond(expected);

            service.getHistories().then(result => {

                expect(Array.isArray(result)).to.be.true;
                expect(result).to.be.empty;
            });

            httpBackend.flush();
        });
    });
});
