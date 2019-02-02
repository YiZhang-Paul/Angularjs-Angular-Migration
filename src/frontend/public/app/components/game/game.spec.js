import SharedModule from '../../shared/shared.module';
import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('game component unit test', () => {
    // TODO: reformat these
    let getGamesStub;
    let getChannelsByGameIdStub;
    let goStub;
    let cancelStub;

    let q;
    let scope;
    let interval;
    let controller;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(ComponentsModule));

    beforeEach('test setup', inject(($injector, $controller) => {

        const gameService = $injector.get('gameHttpService');
        getGamesStub = stub(gameService, 'getGames');

        const channelService = $injector.get('channelHttpService');
        getChannelsByGameIdStub = stub(channelService, 'getChannelsByGameId');

        const state = $injector.get('$state');
        goStub = stub(state, 'go');

        q = $injector.get('$q');
        scope = $injector.get('$rootScope');
        interval = $injector.get('$interval');
        cancelStub = stub(interval, 'cancel');
        controller = $controller('GameController');
    }));

    afterEach('test teardown', () => {

        getGamesStub.restore();
        getChannelsByGameIdStub.restore();
        goStub.restore();
        cancelStub.restore();
    });

    it('should resolve', () => {

        expect(controller).is.not.null;
    });

    describe('$onInit()', () => {

        const games = [{ id: 1 }, { id: 4 }, { id: 7 }];

        it('should load games on initialization', () => {

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

        it('should update view count of cached games', () => {

            controller.games = [{ id: 1, view_count: 2 }, { id: 2, view_count: 5 }];
            const expected = [{ id: 1, view_count: 114 }, { id: 2, view_count: 1 }];
            getGamesStub.returns(q.resolve(expected));

            controller.$onInit();
            scope.$apply();

            expect(controller.games).to.deep.equal(expected);
        });
    });

    describe('$onDestroy()', () => {

        it('should cancel interval', () => {

            const expected = 2;
            controller.task = expected;

            controller.$onDestroy();
            scope.$apply();

            sinonExpect.calledOnce(cancelStub);
            sinonExpect.calledWith(cancelStub, expected);
        });
    });

    describe('toChannelsView()', () => {

        const game = { id: 55, name: 'random game name 5' };

        beforeEach('toChannelsView() test setup', () => {

            getChannelsByGameIdStub.returns(q.resolve([]));
        });

        it('should use channel http service to fetch data', () => {

            controller.toChannelsView(game);
            scope.$apply();

            sinonExpect.calledOnce(getChannelsByGameIdStub);
        });

        it('should change route with correct route parameters', () => {

            const name = 'random-game-name-5';
            const channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = { game, name, channels };
            getChannelsByGameIdStub.returns(q.resolve(channels));

            controller.toChannelsView(game);
            scope.$apply();

            sinonExpect.calledOnce(goStub);
            sinonExpect.calledWith(goStub, 'channels', expected);
        });

        it('should not throw on error', () => {

            getChannelsByGameIdStub.returns(q.reject(new Error()));

            controller.toChannelsView(game);
            scope.$apply();
        });
    });
});
