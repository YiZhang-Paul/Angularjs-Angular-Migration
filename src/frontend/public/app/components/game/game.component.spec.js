import ComponentsModule from '../components.module';

import { mock$state } from '../../../testing/stubs/$state.stub';
import { mockGameService } from '../../../testing/stubs/game.service.stub';
import { mockChannelHttpService } from '../../../testing/stubs/channel-http.service.stub';
import { mockGenericUtilityService } from '../../../testing/stubs/generic-utility.service.stub';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('game component unit test', () => {

    let $q;
    let $interval;
    let $rootScope;
    let component;

    let $stateStub;
    let gameServiceStub;
    let channelHttpServiceStub;
    let genericUtilityServiceStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mocks setup', () => {

        $stateStub = mock$state(mockModule);
        gameServiceStub = mockGameService(mockModule);
        channelHttpServiceStub = mockChannelHttpService(mockModule, inject);
        genericUtilityServiceStub = mockGenericUtilityService(mockModule);

        channelHttpServiceStub.initializeMock();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $interval = $injector.get('$interval');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('game');

        stub($interval, 'cancel');
    }));

    afterEach('general test teardown', () => {

        $interval.cancel.restore();
    });

    it('should resolve', () => {

        expect(component).is.not.null;
    });

    describe('$onInit()', () => {

        it('should cache games on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(gameServiceStub.cacheGames);
        });

        it('should cache games every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            component.$onInit();
            $rootScope.$apply();
            // reset initial call to cache games
            gameServiceStub.cacheGames.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(gameServiceStub.cacheGames, expected);
        });
    });

    describe('$onDestroy()', () => {

        it('should cancel interval', () => {

            const expected = 2;
            component.task = expected;

            component.$onDestroy();
            $rootScope.$apply();

            sinonExpect.calledOnce($interval.cancel);
            sinonExpect.calledWith($interval.cancel, expected);
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

        let game;

        beforeEach('toChannelsView() test setup', () => {

            game = { id: 55, name: 'random game name 5' };
            genericUtilityServiceStub.joinText.returns('');
        });

        it('should use channel http service to fetch data', () => {

            component.toChannelsView(game);
            $rootScope.$apply();

            sinonExpect.calledOnce(channelHttpServiceStub.getChannelsByGameId);
        });

        it('should change route with correct route parameters', () => {

            const name = 'random-game-name-5';
            const channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = { game, name, channels };
            channelHttpServiceStub.getChannelsByGameId.returns($q.resolve(channels));
            genericUtilityServiceStub.joinText.returns(name);

            component.toChannelsView(game);
            $rootScope.$apply();

            sinonExpect.calledOnce(genericUtilityServiceStub.joinText);
            sinonExpect.calledOnce($stateStub.go);
            sinonExpect.calledWith($stateStub.go, 'channels', expected);
        });

        it('should not throw on error', () => {

            channelHttpServiceStub.getChannelsByGameId.returns($q.reject(new Error()));

            component.toChannelsView(game);
            $rootScope.$apply();
        });
    });
});
