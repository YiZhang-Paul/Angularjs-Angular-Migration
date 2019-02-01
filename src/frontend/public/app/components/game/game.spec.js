import SharedModule from '../../shared/shared.module';
import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('game component unit test', () => {

    let getGamesStub;

    let q;
    let scope;
    let interval;
    //TODO: remove when fully refactored
    let httpBackend;
    let controller;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(ComponentsModule));

    beforeEach('test setup', inject(($injector, $controller) => {

        const gameService = $injector.get('gameHttpService');
        getGamesStub = stub(gameService, 'getGames');

        q = $injector.get('$q');
        scope = $injector.get('$rootScope');
        interval = $injector.get('$interval');
        httpBackend = $injector.get('$httpBackend');
        controller = $controller('GameController');
    }));

    afterEach('test teardown', () => {

        getGamesStub.restore();
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should resolve', () => {

        expect(controller).is.not.null;
    });

    describe('$onInit()', () => {

        const games = [{ id: 1 }, { id: 4 }, { id: 7 }];

        it('should load games on instantiation', () => {

            const expected = games;
            getGamesStub.returns(q.resolve(expected));

            controller.$onInit();
            scope.$apply();

            sinonExpect.calledOnce(getGamesStub);
            expect(controller.games).to.deep.equal(expected);
        });

        it('should load games every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);
            getGamesStub.returns(q.resolve([]));

            controller.$onInit();
            interval.flush(seconds * 1000);
            // include initial call before interval is set
            sinonExpect.callCount(getGamesStub, expected + 1);
        });

        it('should keep cached games when load games failed', () => {

            controller.games = games;
            const expected = controller.games.slice();
            getGamesStub.returns(q.reject(new Error()));

            controller.$onInit();
            scope.$apply();

            expect(Array.isArray(controller.games)).to.be.true;
            expect(controller.games).to.deep.equal(expected);
        });
    });
});
