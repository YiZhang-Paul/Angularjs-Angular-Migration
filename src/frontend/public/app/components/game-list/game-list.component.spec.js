import ComponentsModule from '../components.module.ajs';

import { mock$stateNg1 } from '../../../testing/stubs/$state.stub';
import { mockGameListServiceNg1 } from '../../../testing/stubs/game-list.service.stub';
import { mockChannelHttpServiceNg1 } from '../../../testing/stubs/channel-http.service.stub';
import { mockGenericUtilityServiceNg1 } from '../../../testing/stubs/generic-utility.service.stub';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('game list component unit test', () => {

    const tag = '<game-list></game-list>';

    let $q;
    let $compile;
    let $interval;
    let $rootScope;
    let component;
    let componentElement;

    let $stateStub;
    let gameListServiceStub;
    let channelHttpServiceStub;
    let genericUtilityServiceStub;

    beforeEach(mockModule(ComponentsModule));
    beforeEach(mockModule('component-templates'));

    beforeEach('mocks setup', () => {

        $stateStub = mock$stateNg1(mockModule, inject);
        gameListServiceStub = mockGameListServiceNg1(mockModule, inject);
        channelHttpServiceStub = mockChannelHttpServiceNg1(mockModule, inject);
        genericUtilityServiceStub = mockGenericUtilityServiceNg1(mockModule, inject);

        $stateStub.setupMock();
        gameListServiceStub.setupMock();
        channelHttpServiceStub.setupMock();
        genericUtilityServiceStub.setupMock();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $compile = $injector.get('$compile');
        $interval = $injector.get('$interval');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('gameList');

        stub($interval, 'cancel');
    }));

    afterEach('general test teardown', () => {

        $interval.cancel.restore();
    });

    it('should resolve', () => {

        componentElement = $compile(tag)($rootScope);
        $rootScope.$apply();

        expect(component).is.not.null;
        expect(componentElement.html()).is.not.empty;
    });

    describe('$onInit()', () => {

        it('should cache games on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(gameListServiceStub.cacheGames);
        });

        it('should cache games every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            component.$onInit();
            $rootScope.$apply();
            // reset initial call to cache games
            gameListServiceStub.cacheGames.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(gameListServiceStub.cacheGames, expected);
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

        it('should reference cache from game list service', inject($injector => {

            const service = $injector.get('gameListService');
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
            sinonExpect.calledWith($stateStub.go, 'index.channels', expected);
        });

        it('should not throw on error', () => {

            channelHttpServiceStub.getChannelsByGameId.returns($q.reject(new Error()));

            component.toChannelsView(game);
            $rootScope.$apply();
        });
    });
});
