import ComponentsModule from '../components.module';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('channel service unit test', () => {

    let $q;
    let $rootScope;
    let service;

    let getChannelsByGameIdStub;
    let isFollowedStub;
    let followStub;
    let unfollowStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mock channel http service setup', mockModule($provide => {

        getChannelsByGameIdStub = stub();

        $provide.service('channelHttpService', () => ({

            getChannelsByGameId: getChannelsByGameIdStub
        }));
    }));

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

    beforeEach('general test setup', inject($injector => {

        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('channelService');
    }));

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('refreshChannels()', () => {

        let oldChannels;

        beforeEach('refreshChannels() test setup', () => {

            oldChannels = [

                {
                    provider_id: 0,
                    provider_channel_id: 2,
                    streamer_name: 'name_1',
                    title: 'title_1',
                    view_count: 1
                },
                {
                    provider_id: 0,
                    provider_channel_id: 5,
                    streamer_name: 'name_2',
                    title: 'title_2',
                    view_count: 5
                }
            ];
        });

        it('should overwrite old channel when new channel is a different channel', () => {

            const expected = [

                oldChannels[0],
                {
                    provider_id: 0,
                    provider_channel_id: 9,
                    streamer_name: 'name_3',
                    title: 'title_3',
                    view_count: 15
                }
            ];

            service.refreshChannels(oldChannels, expected);

            expect(oldChannels).to.deep.equal(expected);
        });

        it('should update old channel details when new channel is same channel', () => {

            const expected = [

                oldChannels[0],
                {
                    provider_id: oldChannels[1].provider_id,
                    provider_channel_id: oldChannels[1].provider_channel_id,
                    streamer_name: 'new_name',
                    title: 'new_title',
                    view_count: oldChannels[1].view_count + 199
                }
            ];

            service.refreshChannels(oldChannels, expected);

            expect(oldChannels).to.deep.equal(expected);
        });

        it('should include all new channels when they are more than total number of old channels', () => {

            const expected = [

                oldChannels[0],
                oldChannels[1],
                {
                    provider_id: 1,
                    provider_channel_id: 77,
                    streamer_name: 'name_3',
                    title: 'title_3',
                    view_count: 92
                }
            ];

            service.refreshChannels(oldChannels, expected);

            expect(oldChannels).to.deep.equal(expected);
        });

        it('should keep old channels when they are more than total number of new channels', () => {

            const expected = oldChannels.slice();
            const newChannels = oldChannels.slice(0, 1);

            service.refreshChannels(oldChannels, newChannels);

            expect(oldChannels).to.deep.equal(expected);
        });
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
