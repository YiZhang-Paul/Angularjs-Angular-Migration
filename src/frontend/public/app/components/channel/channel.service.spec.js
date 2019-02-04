import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('channel service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let isFollowedStub;
    let followStub;
    let unfollowStub;
    let addHistoryStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock bookmark service setup', mockModule($provide => {

        isFollowedStub = stub();
        followStub = stub();
        unfollowStub = stub();

        $provide.service('bookmarkService', () => ({

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

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('channelService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('isFollowed()', () => {

        it('should use bookmark service to check channel status', () => {

            const channel = { channel_id: 5 };
            isFollowedStub.returns(true);

            const result = service.isFollowed(channel);
            $rootScope.$apply();

            expect(result).to.be.true;
            sinonExpect.calledOnce(isFollowedStub);
            sinonExpect.calledWith(isFollowedStub, channel);
        });
    });

    describe('follow()', () => {

        const channel = { channel_id: 5 };

        it('should use bookmark service to follow channel', () => {

            followStub.returns($q.resolve({}));

            service.follow(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(followStub);
            sinonExpect.calledWith(followStub, channel);
        });

        it('should not throw error when failed to follow channel', () => {

            followStub.returns($q.reject(new Error()));

            service.follow(channel).catch(() => { throw new Error(); });
            $rootScope.$apply();

            sinonExpect.calledOnce(followStub);
        });
    });

    describe('unfollow()', () => {

        const channel = { channel_id: 5 };

        it('should use bookmark service to unfollow channel', () => {

            unfollowStub.returns($q.resolve({}));

            service.unfollow(channel);
            $rootScope.$apply();

            sinonExpect.calledOnce(unfollowStub);
            sinonExpect.calledWith(unfollowStub, channel);
        });

        it('should not throw error when failed to unfollow channel', () => {

            unfollowStub.returns($q.reject(new Error()));

            service.unfollow(channel).catch(() => { throw new Error(); });
            $rootScope.$apply();

            sinonExpect.calledOnce(unfollowStub);
        });
    });
});
