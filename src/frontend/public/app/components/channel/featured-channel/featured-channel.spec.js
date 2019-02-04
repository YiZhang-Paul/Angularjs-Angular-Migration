import ComponentsModule from '../../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('featured channel component unit test', () => {

    let $q;
    let $rootScope;
    let component;

    let playThumbnailStub;
    let stopThumbnailStub;
    let isFollowedStub;
    let followStub;
    let unfollowStub;
    let addHistoryStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock channel service setup', mockModule($provide => {

        playThumbnailStub = stub();
        stopThumbnailStub = stub();
        isFollowedStub = stub();
        followStub = stub();
        unfollowStub = stub();
        addHistoryStub = stub();

        $provide.service('channelService', () => ({

            playThumbnail: playThumbnailStub,
            stopThumbnail: stopThumbnailStub,
            isFollowed: isFollowedStub,
            follow: followStub,
            unfollow: unfollowStub,
            addHistory: addHistoryStub
        }));
    }));

    beforeEach('general test setup', inject(($injector, $controller) => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        component = $controller('FeaturedChannelController');
    }));

    it('should resolve', () => {

        expect(component).is.not.null;
    });

    describe('playThumbnail()', () => {

        it('should use channel service to play thumbnail', () => {

            const video = { srcElement: { currentTime: 55 } };

            component.playThumbnail(video);
            $rootScope.$apply();

            sinonExpect.calledOnce(playThumbnailStub);
            sinonExpect.calledWith(playThumbnailStub, video);
        });
    });

    describe('stopThumbnail()', () => {

        it('should use channel service to stop thumbnail', () => {

            const video = { srcElement: { currentTime: 55 } };

            component.stopThumbnail(video);
            $rootScope.$apply();

            sinonExpect.calledOnce(stopThumbnailStub);
            sinonExpect.calledWith(stopThumbnailStub, video);
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

        it('should use channel service to add view history', () => {

            const channel = { channel_id: 5 };
            addHistoryStub.returns($q.resolve({}));

            component.addHistory(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(addHistoryStub);
            sinonExpect.calledWith(addHistoryStub, channel);
        });
    });
});
