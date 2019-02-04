import SharedModule from '../../shared/shared.module';
import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('channel component unit test', () => {

    let $q;
    let $rootScope;
    let component;

    let playStub;
    let stopStub;
    let isFollowedStub;
    let followStub;
    let unfollowStub;
    let addHistoryStub;

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

    beforeEach('mock channel service setup', mockModule($provide => {

        isFollowedStub = stub();
        followStub = stub();
        unfollowStub = stub();

        $provide.service('channelService', () => ({

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

    beforeEach('general test setup', inject(($injector, $controller) => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        component = $controller('ChannelController');
    }));

    it('should resolve', () => {

        expect(component).is.not.null;
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
