import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('game component unit test', () => {

    let $q;
    let $interval;
    let $rootScope;
    let component;

    let getChannelsByGameIdStub;
    let cacheGamesStub;
    let joinTextStub;
    let goStub;
    let cancelStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock channel http service setup', mockModule($provide => {

        getChannelsByGameIdStub = stub();

        $provide.service('channelHttpService', () => ({

            getChannelsByGameId: getChannelsByGameIdStub
        }));
    }));

    beforeEach('mock game service setup', mockModule($provide => {

        cacheGamesStub = stub();

        $provide.service('gameService', () => ({

            cacheGames: cacheGamesStub
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

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $interval = $injector.get('$interval');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('game');

        cancelStub = stub($interval, 'cancel');
    }));

    afterEach('general test teardown', () => {

        cancelStub.restore();
    });

    it('should resolve', () => {

        expect(component).is.not.null;
    });

    describe('$onInit()', () => {

        it('should cache games on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(cacheGamesStub);
        });

        it('should cache games every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            component.$onInit();
            $rootScope.$apply();
            // reset initial call to cache games
            cacheGamesStub.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(cacheGamesStub, expected);
        });
    });

    describe('$onDestroy()', () => {

        it('should cancel interval', () => {

            const expected = 2;
            component.task = expected;

            component.$onDestroy();
            $rootScope.$apply();

            sinonExpect.calledOnce(cancelStub);
            sinonExpect.calledWith(cancelStub, expected);
        });
    });

    describe('games', () => {

        it('should reference cache from game service', inject($injector => {

            const service = $injector.get('gameService');
            service.games = [{ id: 1 }, { id: 4 }, { id: 7 }];

            expect(component.games).to.deep.equal(service.games);
        }));
    });

    describe('toChannelsView()', () => {

        const game = { id: 55, name: 'random game name 5' };

        beforeEach('toChannelsView() test setup', () => {

            getChannelsByGameIdStub.returns($q.resolve([]));
            joinTextStub.returns('');
        });

        it('should use channel http service to fetch data', () => {

            component.toChannelsView(game);
            $rootScope.$apply();

            sinonExpect.calledOnce(getChannelsByGameIdStub);
        });

        it('should change route with correct route parameters', () => {

            const name = 'random-game-name-5';
            const channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = { game, name, channels };
            getChannelsByGameIdStub.returns($q.resolve(channels));
            joinTextStub.returns(name);

            component.toChannelsView(game);
            $rootScope.$apply();

            sinonExpect.calledOnce(joinTextStub);
            sinonExpect.calledOnce(goStub);
            sinonExpect.calledWith(goStub, 'channels', expected);
        });

        it('should not throw on error', () => {

            getChannelsByGameIdStub.returns($q.reject(new Error()));

            component.toChannelsView(game);
            $rootScope.$apply();
        });
    });
});
