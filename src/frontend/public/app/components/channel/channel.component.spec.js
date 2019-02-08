import SharedModule from '../../shared/shared.module';
import ComponentsModule from '../components.module';

import { mockChannelService } from '../../../testing/stubs/channel.service.stub';
import { mockGameHttpService } from '../../../testing/stubs/game-http.service.stub';
import { mockViewHistoryService } from '../../../testing/stubs/view-history.service.stub';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('channel component unit test', () => {

    const tag = '<channel></channel>';

    let $q;
    let $compile;
    let $interval;
    let $rootScope;
    let $stateParams;
    let component;
    let componentElement;

    let channelServiceStub;
    let gameHttpServiceStub;
    let viewHistoryServiceStub;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(ComponentsModule));
    beforeEach(mockModule('component-templates'));

    beforeEach('mocks setup', () => {

        channelServiceStub = mockChannelService(mockModule, inject);
        gameHttpServiceStub = mockGameHttpService(mockModule, inject);
        viewHistoryServiceStub = mockViewHistoryService(mockModule, inject);

        channelServiceStub.initializeMock();
        gameHttpServiceStub.initializeMock();
        viewHistoryServiceStub.initializeMock();
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
            channelServiceStub.getChannelsByGameId.returns($q.resolve(channels));
            channelServiceStub.refreshChannels.callsFake((a, b) => a.push(...b));
        });

        it('should load data from state parameters when both game and channels data exist', () => {

            component.$onInit();
            $rootScope.$apply();

            expect(component.game).to.deep.equal(game);
            expect(component.channels).to.deep.equal(channels);
            sinonExpect.notCalled(gameHttpServiceStub.getGameByName);
            sinonExpect.notCalled(channelServiceStub.getChannelsByGameId);
            sinonExpect.notCalled(channelServiceStub.refreshChannels);
        });

        it('should fetch game and channels data from services when game data is missing from state parameters', () => {

            $stateParams.game = null;

            component.$onInit();
            $rootScope.$apply();

            expect(component.game).to.deep.equal(game);
            expect(component.channels).to.deep.equal(channels);
            sinonExpect.calledOnce(gameHttpServiceStub.getGameByName);
            sinonExpect.calledWith(gameHttpServiceStub.getGameByName, game.name);
            sinonExpect.calledOnce(channelServiceStub.getChannelsByGameId);
            sinonExpect.calledWith(channelServiceStub.getChannelsByGameId, game.id);
            sinonExpect.calledOnce(channelServiceStub.refreshChannels);
        });

        it('should fetch game and channels data from services when channels data is missing from state parameters', () => {

            $stateParams.channels = null;

            component.$onInit();
            $rootScope.$apply();

            expect(component.game).to.deep.equal(game);
            expect(component.channels).to.deep.equal(channels);
            sinonExpect.calledOnce(gameHttpServiceStub.getGameByName);
            sinonExpect.calledWith(gameHttpServiceStub.getGameByName, game.name);
            sinonExpect.calledOnce(channelServiceStub.getChannelsByGameId);
            sinonExpect.calledWith(channelServiceStub.getChannelsByGameId, game.id);
            sinonExpect.calledOnce(channelServiceStub.refreshChannels);
        });

        it('should load channels every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            component.$onInit();
            $rootScope.$apply();
            // reset initial call to load channels
            channelServiceStub.getChannelsByGameId.resetHistory();
            channelServiceStub.refreshChannels.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(channelServiceStub.getChannelsByGameId, expected);
            sinonExpect.callCount(channelServiceStub.refreshChannels, expected);
        });

        it('should not load channel data when game data is not found', () => {

            $stateParams.game = null;
            $stateParams.channels = null;
            gameHttpServiceStub.getGameByName.returns($q.resolve(null));

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(gameHttpServiceStub.getGameByName);
            sinonExpect.notCalled(channelServiceStub.getChannelsByGameId);
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
            channelServiceStub.getChannelsByGameId.returns($q.reject(new Error()));

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(channelServiceStub.getChannelsByGameId);
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

        it('should use channel service to check channel status', () => {

            const channel = { channel_id: 5 };

            const result = component.isFollowed(channel);
            $rootScope.$apply();

            expect(result).to.be.true;
            sinonExpect.calledOnce(channelServiceStub.isFollowed);
            sinonExpect.calledWith(channelServiceStub.isFollowed, channel);
        });
    });

    describe('follow()', () => {

        it('should use channel service to follow channel', () => {

            const channel = { channel_id: 5 };

            component.follow(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(channelServiceStub.follow);
            sinonExpect.calledWith(channelServiceStub.follow, channel);
        });
    });

    describe('unfollow()', () => {

        it('should use channel service to unfollow channel', () => {

            const channel = { channel_id: 5 };

            component.unfollow(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(channelServiceStub.unfollow);
            sinonExpect.calledWith(channelServiceStub.unfollow, channel);
        });
    });

    describe('addHistory()', () => {

        it('should use view history service to add view history', () => {

            const channel = { channel_id: 5 };

            component.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryServiceStub.addHistory);
            sinonExpect.calledWith(viewHistoryServiceStub.addHistory, channel);
        });
    });
});
