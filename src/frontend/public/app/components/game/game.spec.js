import SharedModule from '../../shared/shared.module';
import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('game component unit test', () => {

    let $q;
    let $interval;
    let $rootScope;
    let controller;

    let getGamesStub;
    let getChannelsByGameIdStub;
    let joinTextStub;
    let goStub;
    let cancelStub;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock game http service setup', mockModule($provide => {

        getGamesStub = stub();

        $provide.service('gameHttpService', () => ({

            getGames: getGamesStub
        }));
    }));

    beforeEach('mock channel http service setup', mockModule($provide => {

        getChannelsByGameIdStub = stub();

        $provide.service('channelHttpService', () => ({

            getChannelsByGameId: getChannelsByGameIdStub
        }));
    }));

    beforeEach('mock generic utility service setup', mockModule($provide => {

        joinTextStub = stub();

        $provide.service('genericUtilityService', () => ({

            joinText: joinTextStub
        }));
    }));

    beforeEach('mock $state setup', mockModule($provide => {

        goStub = stub();

        $provide.service('$state', () => ({

            go: goStub
        }));
    }));

    beforeEach('general test setup', inject(($injector, $controller) => {

        $q = $injector.get('$q');
        $interval = $injector.get('$interval');
        $rootScope = $injector.get('$rootScope');
        controller = $controller('GameController');

        cancelStub = stub($interval, 'cancel');
    }));

    afterEach('general test teardown', () => {

        cancelStub.restore();
    });

    it('should resolve', () => {

        expect(controller).is.not.null;
    });

    describe('$onInit()', () => {

        const games = [{ id: 1 }, { id: 4 }, { id: 7 }];

        it('should load games on initialization', () => {

            const expected = games;
            getGamesStub.returns($q.resolve(expected));

            controller.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(getGamesStub);
            expect(controller.games).to.deep.equal(expected);
        });

        it('should load games every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);
            getGamesStub.returns($q.resolve([]));

            controller.$onInit();
            $rootScope.$apply();
            // reset initial call to load games
            getGamesStub.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(getGamesStub, expected);
        });

        it('should keep cached games when load games failed', () => {

            controller.games = games;
            const expected = controller.games.slice();
            getGamesStub.returns($q.reject(new Error()));

            controller.$onInit();
            $rootScope.$apply();

            expect(Array.isArray(controller.games)).to.be.true;
            expect(controller.games).to.deep.equal(expected);
        });

        it('should update view count of cached games', () => {

            controller.games = [{ id: 1, view_count: 2 }, { id: 2, view_count: 5 }];
            const expected = [{ id: 1, view_count: 114 }, { id: 2, view_count: 1 }];
            getGamesStub.returns($q.resolve(expected));

            controller.$onInit();
            $rootScope.$apply();

            expect(controller.games).to.deep.equal(expected);
        });
    });

    describe('$onDestroy()', () => {

        it('should cancel interval', () => {

            const expected = 2;
            controller.task = expected;

            controller.$onDestroy();
            $rootScope.$apply();

            sinonExpect.calledOnce(cancelStub);
            sinonExpect.calledWith(cancelStub, expected);
        });
    });

    describe('toChannelsView()', () => {

        const game = { id: 55, name: 'random game name 5' };

        beforeEach('toChannelsView() test setup', () => {

            getChannelsByGameIdStub.returns($q.resolve([]));
            joinTextStub.returns('');
        });

        it('should use channel http service to fetch data', () => {

            controller.toChannelsView(game);
            $rootScope.$apply();

            sinonExpect.calledOnce(getChannelsByGameIdStub);
        });

        it('should change route with correct route parameters', () => {

            const name = 'random-game-name-5';
            const channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = { game, name, channels };
            getChannelsByGameIdStub.returns($q.resolve(channels));
            joinTextStub.returns(name);

            controller.toChannelsView(game);
            $rootScope.$apply();

            sinonExpect.calledOnce(joinTextStub);
            sinonExpect.calledOnce(goStub);
            sinonExpect.calledWith(goStub, 'channels', expected);
        });

        it('should not throw on error', () => {

            getChannelsByGameIdStub.returns($q.reject(new Error()));

            controller.toChannelsView(game);
            $rootScope.$apply();
        });
    });
});
