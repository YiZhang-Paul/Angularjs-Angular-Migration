import ComponentsModule from '../../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('featured channel component unit test', () => {

    let $q;
    let $interval;
    let $rootScope;
    let component;

    let playStub;
    let stopStub;
    let getFeaturedChannelsStub;
    let refreshChannelsStub;
    let isFollowedStub;
    let followStub;
    let unfollowStub;
    let addHistoryStub;
    let cancelStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock thumbnail player service setup', mockModule($provide => {

        playStub = stub();
        stopStub = stub();

        $provide.service('thumbnailPlayerService', () => ({

            play: playStub,
            stop: stopStub
        }));
    }));

    beforeEach('mock featured channel service setup', mockModule($provide => {

        getFeaturedChannelsStub = stub();

        $provide.service('featuredChannelService', () => ({

            getFeaturedChannels: getFeaturedChannelsStub
        }));
    }));

    beforeEach('mock channel service setup', mockModule($provide => {

        refreshChannelsStub = stub();
        isFollowedStub = stub();
        followStub = stub();
        unfollowStub = stub();

        $provide.service('channelService', () => ({

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
        component = $componentController('featuredChannel');

        cancelStub = stub($interval, 'cancel');
    }));

    afterEach('general test teardown', () => {

        cancelStub.restore();
    });

    it('should resolve', () => {

        expect(component).is.not.null;
    });

    describe('$onInit()', () => {

        const channels = [{ id: 1 }, { id: 4 }, { id: 7 }];

        beforeEach('$onInit() test setup', () => {

            getFeaturedChannelsStub.returns($q.resolve(channels));
        });

        it('should use featured channel service and channel service to load channels on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(getFeaturedChannelsStub);
            sinonExpect.calledOnce(refreshChannelsStub);
            sinonExpect.calledWith(refreshChannelsStub, [], channels);
        });

        it('should load channels on initialization', () => {

            const expected = channels.slice();
            refreshChannelsStub.callsFake((a, b) => a.push(...b));

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(refreshChannelsStub);
            expect(component.channels).to.deep.equal(expected);
        });

        it('should load channels every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            component.$onInit();
            $rootScope.$apply();
            // reset initial call to load channels
            getFeaturedChannelsStub.resetHistory();
            refreshChannelsStub.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(getFeaturedChannelsStub, expected);
            sinonExpect.callCount(refreshChannelsStub, expected);
        });

        it('should not throw error when failed to load featured channels', () => {

            getFeaturedChannelsStub.returns($q.reject(new Error()));

            component.$onInit();
            $rootScope.$apply();
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
