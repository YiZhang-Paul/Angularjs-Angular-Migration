import SharedModule from '../../../shared/shared.module.ajs';
import ChannelModule from '../channel.module.ajs';

import { stubChannelManagerServiceNg1 } from '../../../testing/stubs/custom/channel-manager.service.stub';
import { stubGameHttpServiceNg1 } from '../../../testing/stubs/custom/game-http.service.stub';
import { stubViewHistoryManagerServiceNg1 } from '../../../testing/stubs/custom/view-history-manager.service.stub';

const module = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('game channel list component unit test', () => {

    const tag = '<game-channel-list></game-channel-list>';

    let $q;
    let $compile;
    let $interval;
    let $rootScope;
    let $stateParams;
    let component;
    let componentElement;

    let channelManagerServiceStub;
    let gameHttpServiceStub;
    let viewHistoryManagerServiceStub;

    beforeEach(module(SharedModule));
    beforeEach(module(ChannelModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        channelManagerServiceStub = stubChannelManagerServiceNg1(module, inject);
        gameHttpServiceStub = stubGameHttpServiceNg1(module, inject);
        viewHistoryManagerServiceStub = stubViewHistoryManagerServiceNg1(module, inject);

        channelManagerServiceStub.setupStub();
        gameHttpServiceStub.setupStub();
        viewHistoryManagerServiceStub.setupStub();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $compile = $injector.get('$compile');
        $interval = $injector.get('$interval');
        $rootScope = $injector.get('$rootScope');
        $stateParams = $injector.get('$stateParams');
        component = $componentController('channel');

        stub($interval, 'cancel');
    }));

    afterEach('general test teardown', () => {

        $interval.cancel.restore();
    });

    it('should resolve', () => {

        $stateParams.name = 'some-game-5';
        componentElement = $compile(tag)($rootScope);
        $rootScope.$apply();

        expect(component).is.not.null;
        expect(componentElement.html()).is.not.empty;
    });

    describe('$onInit()', () => {

        const name = 'some-game-5';
        let game;
        let channels;

        beforeEach('$onInit() test setup', () => {

            game = { id: 15, name: 'some game 5' };
            channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            $stateParams.name = name;
            $stateParams.game = game;
            $stateParams.channels = channels;
            gameHttpServiceStub.getGameByName.returns($q.resolve(game));
            channelManagerServiceStub.getChannelsByGameId.returns($q.resolve(channels));
            channelManagerServiceStub.refreshChannels.callsFake((a, b) => a.push(...b));
        });

        it('should load data from state parameters when both game and channels data exist', () => {

            component.$onInit();
            $rootScope.$apply();

            expect(component.game).to.deep.equal(game);
            expect(component.channels).to.deep.equal(channels);
            sinonExpect.notCalled(gameHttpServiceStub.getGameByName);
            sinonExpect.notCalled(channelManagerServiceStub.getChannelsByGameId);
            sinonExpect.notCalled(channelManagerServiceStub.refreshChannels);
        });

        it('should fetch game and channels data from services when game data is missing from state parameters', () => {

            $stateParams.game = null;

            component.$onInit();
            $rootScope.$apply();

            expect(component.game).to.deep.equal(game);
            expect(component.channels).to.deep.equal(channels);
            sinonExpect.calledOnce(gameHttpServiceStub.getGameByName);
            sinonExpect.calledWith(gameHttpServiceStub.getGameByName, game.name);
            sinonExpect.calledOnce(channelManagerServiceStub.getChannelsByGameId);
            sinonExpect.calledWith(channelManagerServiceStub.getChannelsByGameId, game.id);
            sinonExpect.calledOnce(channelManagerServiceStub.refreshChannels);
        });

        it('should fetch game and channels data from services when channels data is missing from state parameters', () => {

            $stateParams.channels = null;

            component.$onInit();
            $rootScope.$apply();

            expect(component.game).to.deep.equal(game);
            expect(component.channels).to.deep.equal(channels);
            sinonExpect.calledOnce(gameHttpServiceStub.getGameByName);
            sinonExpect.calledWith(gameHttpServiceStub.getGameByName, game.name);
            sinonExpect.calledOnce(channelManagerServiceStub.getChannelsByGameId);
            sinonExpect.calledWith(channelManagerServiceStub.getChannelsByGameId, game.id);
            sinonExpect.calledOnce(channelManagerServiceStub.refreshChannels);
        });

        it('should load channels every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            component.$onInit();
            $rootScope.$apply();
            // reset initial call to load channels
            channelManagerServiceStub.getChannelsByGameId.resetHistory();
            channelManagerServiceStub.refreshChannels.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(channelManagerServiceStub.getChannelsByGameId, expected);
            sinonExpect.callCount(channelManagerServiceStub.refreshChannels, expected);
        });

        it('should not load channel data when game data is not found', () => {

            $stateParams.game = null;
            $stateParams.channels = null;
            gameHttpServiceStub.getGameByName.returns($q.resolve(null));

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(gameHttpServiceStub.getGameByName);
            sinonExpect.notCalled(channelManagerServiceStub.getChannelsByGameId);
        });

        it('should not throw error when failed to fetch game data from service', () => {

            $stateParams.game = null;
            $stateParams.channels = null;
            gameHttpServiceStub.getGameByName.returns($q.reject(new Error()));

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(gameHttpServiceStub.getGameByName);
        });

        it('should not throw error when failed to fetch channel data from service', () => {

            $stateParams.game = null;
            $stateParams.channels = null;
            channelManagerServiceStub.getChannelsByGameId.returns($q.reject(new Error()));

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(channelManagerServiceStub.getChannelsByGameId);
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

    describe('isFollowed()', () => {

        it('should use channel manager service to check channel status', () => {

            const channel = { channel_id: 5 };

            const result = component.isFollowed(channel);
            $rootScope.$apply();

            expect(result).to.be.true;
            sinonExpect.calledOnce(channelManagerServiceStub.isFollowed);
            sinonExpect.calledWith(channelManagerServiceStub.isFollowed, channel);
        });
    });

    describe('follow()', () => {

        it('should use channel manager service to follow channel', () => {

            const channel = { channel_id: 5 };

            component.follow(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(channelManagerServiceStub.follow);
            sinonExpect.calledWith(channelManagerServiceStub.follow, channel);
        });
    });

    describe('unfollow()', () => {

        it('should use channel manager service to unfollow channel', () => {

            const channel = { channel_id: 5 };

            component.unfollow(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(channelManagerServiceStub.unfollow);
            sinonExpect.calledWith(channelManagerServiceStub.unfollow, channel);
        });
    });

    describe('addHistory()', () => {

        it('should use view history manager service to add view history', () => {

            const channel = { channel_id: 5 };

            component.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryManagerServiceStub.addHistory);
            sinonExpect.calledWith(viewHistoryManagerServiceStub.addHistory, channel);
        });
    });
});
