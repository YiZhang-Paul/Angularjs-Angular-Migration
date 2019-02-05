import SharedModule from '../../shared/shared.module';
import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('channel component unit test', () => {

    let $q;
    let $interval;
    let $rootScope;
    let $stateParams;
    let component;

    let playStub;
    let stopStub;
    let getGamesStub;
    let getChannelsByGameIdStub;
    let refreshChannelsStub;
    let isFollowedStub;
    let followStub;
    let unfollowStub;
    let addHistoryStub;
    let cancelStub;

    beforeEach(mockModule(SharedModule));
    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock thumbnail player service setup', mockModule($provide => {

        playStub = stub();
        stopStub = stub();

        $provide.service('thumbnailPlayerService', () => ({

            play: playStub,
            stop: stopStub
        }));
    }));

    beforeEach('mock game http service setup', mockModule($provide => {

        getGamesStub = stub();

        $provide.service('gameHttpService', () => ({

            getGames: getGamesStub
        }));
    }));

    beforeEach('mock channel service setup', mockModule($provide => {

        getChannelsByGameIdStub = stub();
        refreshChannelsStub = stub();
        isFollowedStub = stub();
        followStub = stub();
        unfollowStub = stub();

        $provide.service('channelService', () => ({

            getChannelsByGameId: getChannelsByGameIdStub,
            refreshChannels: refreshChannelsStub,
            isFollowed: isFollowedStub,
            follow: followStub,
            unfollow: unfollowStub
        }));
    }));

    beforeEach('mock view history service setup', mockModule($provide => {

        addHistoryStub = stub();

        $provide.service('viewHistoryService', () => ({

            addHistory: addHistoryStub
        }));
    }));

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $interval = $injector.get('$interval');
        $rootScope = $injector.get('$rootScope');
        $stateParams = $injector.get('$stateParams');
        component = $componentController('channel');

        cancelStub = stub($interval, 'cancel');
    }));

    afterEach('general test teardown', () => {

        cancelStub.restore();
    });

    it('should resolve', () => {

        expect(component).is.not.null;
    });

    describe('$onInit()', () => {

        const name = 'some-game-5';
        const game = { id: 15, name: 'some game 5' };
        const channels = [{ id: 1 }, { id: 4 }, { id: 7 }];

        beforeEach('$onInit() test setup', () => {

            $stateParams.name = name;
            $stateParams.game = game;
            $stateParams.channels = channels;
            getGamesStub.returns($q.resolve([game]));
            getChannelsByGameIdStub.returns($q.resolve(channels));
            refreshChannelsStub.callsFake((a, b) => a.push(...b));
        });

        it('should load data from state parameters when both game and channels data exist', () => {

            component.$onInit();
            $rootScope.$apply();

            expect(component.game).to.deep.equal(game);
            expect(component.channels).to.deep.equal(channels);
            sinonExpect.notCalled(getGamesStub);
            sinonExpect.notCalled(getChannelsByGameIdStub);
            sinonExpect.notCalled(refreshChannelsStub);
        });

        it('should fetch game and channels data from services when game data is missing from state parameters', () => {

            $stateParams.game = null;

            component.$onInit();
            $rootScope.$apply();

            expect(component.game).to.deep.equal(game);
            expect(component.channels).to.deep.equal(channels);
            sinonExpect.calledOnce(getGamesStub);
            sinonExpect.calledOnce(getChannelsByGameIdStub);
            sinonExpect.calledWith(getChannelsByGameIdStub, game.id);
            sinonExpect.calledOnce(refreshChannelsStub);
        });

        it('should fetch game and channels data from services when channels data is missing from state parameters', () => {

            $stateParams.channels = null;

            component.$onInit();
            $rootScope.$apply();

            expect(component.game).to.deep.equal(game);
            expect(component.channels).to.deep.equal(channels);
            sinonExpect.calledOnce(getGamesStub);
            sinonExpect.calledOnce(getChannelsByGameIdStub);
            sinonExpect.calledWith(getChannelsByGameIdStub, game.id);
            sinonExpect.calledOnce(refreshChannelsStub);
        });

        it('should load channels every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            component.$onInit();
            $rootScope.$apply();
            // reset initial call to load channels
            getChannelsByGameIdStub.resetHistory();
            refreshChannelsStub.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(getChannelsByGameIdStub, expected);
            sinonExpect.callCount(refreshChannelsStub, expected);
        });

        it('should not load channel data when game data is not found', () => {

            $stateParams.game = null;
            $stateParams.channels = null;
            getGamesStub.returns($q.resolve([]));

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(getGamesStub);
            sinonExpect.notCalled(getChannelsByGameIdStub);
        });

        it('should not throw error when failed to fetch game data from service', () => {

            $stateParams.game = null;
            $stateParams.channels = null;
            getGamesStub.returns($q.reject(new Error()));

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(getGamesStub);
        });

        it('should not throw error when failed to fetch channel data from service', () => {

            $stateParams.game = null;
            $stateParams.channels = null;
            getChannelsByGameIdStub.returns($q.reject(new Error()));

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(getChannelsByGameIdStub);
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

    describe('playThumbnail()', () => {

        it('should use thumbnail player service to play thumbnail', () => {

            const thumbnail = { srcElement: { currentTime: 55 } };

            component.playThumbnail(thumbnail);
            $rootScope.$apply();

            sinonExpect.calledOnce(playStub);
            sinonExpect.calledWith(playStub, thumbnail);
        });
    });

    describe('stopThumbnail()', () => {

        it('should use thumbnail player service to stop thumbnail', () => {

            const thumbnail = { srcElement: { currentTime: 55 } };

            component.stopThumbnail(thumbnail);
            $rootScope.$apply();

            sinonExpect.calledOnce(stopStub);
            sinonExpect.calledWith(stopStub, thumbnail);
        });
    });

    describe('isFollowed()', () => {

        it('should use channel service to check channel status', () => {

            const channel = { channel_id: 5 };
            isFollowedStub.returns(true);

            const result = component.isFollowed(channel);
            $rootScope.$apply();

            expect(result).to.be.true;
            sinonExpect.calledOnce(isFollowedStub);
            sinonExpect.calledWith(isFollowedStub, channel);
        });
    });

    describe('follow()', () => {

        it('should use channel service to follow channel', () => {

            const channel = { channel_id: 5 };
            followStub.returns($q.resolve({}));

            component.follow(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(followStub);
            sinonExpect.calledWith(followStub, channel);
        });
    });

    describe('unfollow()', () => {

        it('should use channel service to unfollow channel', () => {

            const channel = { channel_id: 5 };
            unfollowStub.returns($q.resolve({}));

            component.unfollow(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(unfollowStub);
            sinonExpect.calledWith(unfollowStub, channel);
        });
    });

    describe('addHistory()', () => {

        it('should use view history service to add view history', () => {

            const channel = { channel_id: 5 };
            addHistoryStub.returns($q.resolve({}));

            component.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(addHistoryStub);
            sinonExpect.calledWith(addHistoryStub, channel);
        });
    });
});
