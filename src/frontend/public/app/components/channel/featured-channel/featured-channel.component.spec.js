import ComponentsModule from '../../components.module';

import { mockChannelService } from '../../../../testing/stubs/channel.service.stub';
import { mockFeaturedChannelService } from '../../../../testing/stubs/featured-channel.service.stub';
import { mockViewHistoryService } from '../../../../testing/stubs/view-history.service.stub';
import { mockThumbnailPlayerService } from '../../../../testing/stubs/thumbnail-player.service.stub';

const mockModule = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('featured channel component unit test', () => {

    let $q;
    let $interval;
    let $rootScope;
    let component;

    let channelServiceStub;
    let featuredChannelServiceStub;
    let viewHistoryServiceStub;
    let thumbnailPlayerServiceStub;

    beforeEach(mockModule(ComponentsModule));

    beforeEach('mocks setup', () => {

        channelServiceStub = mockChannelService(mockModule, inject);
        featuredChannelServiceStub = mockFeaturedChannelService(mockModule, inject);
        viewHistoryServiceStub = mockViewHistoryService(mockModule, inject);
        thumbnailPlayerServiceStub = mockThumbnailPlayerService(mockModule);

        channelServiceStub.initializeMock();
        featuredChannelServiceStub.initializeMock();
        viewHistoryServiceStub.initializeMock();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $interval = $injector.get('$interval');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('featuredChannel');

        stub($interval, 'cancel');
    }));

    afterEach('general test teardown', () => {

        $interval.cancel.restore();
    });

    it('should resolve', () => {

        expect(component).is.not.null;
    });

    describe('$onInit()', () => {

        let channels;

        beforeEach('$onInit() test setup', () => {

            channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            featuredChannelServiceStub.getFeaturedChannels.returns($q.resolve(channels));
        });

        it('should use featured channel service and channel service to load channels on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(featuredChannelServiceStub.getFeaturedChannels);
            sinonExpect.calledOnce(channelServiceStub.refreshChannels);
            sinonExpect.calledWith(channelServiceStub.refreshChannels, [], channels);
        });

        it('should load channels on initialization', () => {

            const expected = channels.slice();
            channelServiceStub.refreshChannels.callsFake((a, b) => a.push(...b));

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(channelServiceStub.refreshChannels);
            expect(component.channels).to.deep.equal(expected);
        });

        it('should load channels every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            component.$onInit();
            $rootScope.$apply();
            // reset initial call to load channels
            featuredChannelServiceStub.getFeaturedChannels.resetHistory();
            channelServiceStub.refreshChannels.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(featuredChannelServiceStub.getFeaturedChannels, expected);
            sinonExpect.callCount(channelServiceStub.refreshChannels, expected);
        });

        it('should not throw error when failed to load featured channels', () => {

            featuredChannelServiceStub.getFeaturedChannels.returns($q.reject(new Error()));

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

            sinonExpect.calledOnce($interval.cancel);
            sinonExpect.calledWith($interval.cancel, expected);
        });
    });

    describe('playThumbnail()', () => {

        it('should use thumbnail player service to play thumbnail', () => {

            const thumbnail = { srcElement: { currentTime: 55 } };

            component.playThumbnail(thumbnail);
            $rootScope.$apply();

            sinonExpect.calledOnce(thumbnailPlayerServiceStub.play);
            sinonExpect.calledWith(thumbnailPlayerServiceStub.play, thumbnail);
        });
    });

    describe('stopThumbnail()', () => {

        it('should use thumbnail player service to stop thumbnail', () => {

            const thumbnail = { srcElement: { currentTime: 55 } };

            component.stopThumbnail(thumbnail);
            $rootScope.$apply();

            sinonExpect.calledOnce(thumbnailPlayerServiceStub.stop);
            sinonExpect.calledWith(thumbnailPlayerServiceStub.stop, thumbnail);
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
