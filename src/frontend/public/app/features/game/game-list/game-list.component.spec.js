import GameModule from '../game.module.ajs';

import { stub$stateNg1 } from '../../../testing/stubs/third-party/$state.stub';
import { stubGameManagerServiceNg1 } from '../../../testing/stubs/custom/game-manager.service.stub';
import { stubCustomRoutingServiceNg1 } from '../../../testing/stubs/custom/custom-routing.service.stub';

const module = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('game list component unit test', () => {

    const tag = '<game-list></game-list>';

    let $compile;
    let $interval;
    let $rootScope;
    let component;
    let componentElement;

    let $stateStub;
    let gameManagerServiceStub;
    let customRoutingServiceStub;

    beforeEach(module(GameModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        $stateStub = stub$stateNg1(module, inject);
        gameManagerServiceStub = stubGameManagerServiceNg1(module, inject);
        customRoutingServiceStub = stubCustomRoutingServiceNg1(module, inject);

        $stateStub.setupStub();
        gameManagerServiceStub.setupStub();
        customRoutingServiceStub.setupStub();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

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

            sinonExpect.calledOnce(gameManagerServiceStub.cacheGames);
        });

        it('should cache games every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            component.$onInit();
            $rootScope.$apply();
            // reset initial call to cache games
            gameManagerServiceStub.cacheGames.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(gameManagerServiceStub.cacheGames, expected);
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

        it('should reference cache from game manager service', inject($injector => {

            const service = $injector.get('gameManagerService');
            service.games = [{ id: 1 }, { id: 4 }, { id: 7 }];

            expect(component.games).to.deep.equal(service.games);
        }));
    });

    describe('toChannelsView()', () => {

        it('should use custom routing service to change route', () => {

            const expected = 17;

            component.toChannelsView({ id: expected });

            sinonExpect.calledOnce(customRoutingServiceStub.toChannelsView);
            sinonExpect.calledWith(customRoutingServiceStub.toChannelsView, expected);
        });
    });
});
