import ChannelModule from '../channel.module.ajs';

import { stubChannelManagerServiceNg1 } from '../../../testing/stubs/custom/channel-manager.service.stub';
import { stubFeaturedChannelManagerServiceNg1 } from '../../../testing/stubs/custom/featured-channel-manager.service.stub';
import { stubViewHistoryManagerServiceNg1 } from '../../../testing/stubs/custom/view-history-manager.service.stub';

const module = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('featured channel list component unit test', () => {

    const tag = '<featured-channel-list></featured-channel-list>';

    let $q;
    let $compile;
    let $interval;
    let $rootScope;
    let component;
    let componentElement;

    let channelManagerServiceStub;
    let featuredChannelManagerServiceStub;
    let viewHistoryManagerServiceStub;

    beforeEach(module(ChannelModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        channelManagerServiceStub = stubChannelManagerServiceNg1(module, inject);
        featuredChannelManagerServiceStub = stubFeaturedChannelManagerServiceNg1(module, inject);
        viewHistoryManagerServiceStub = stubViewHistoryManagerServiceNg1(module, inject);

        channelManagerServiceStub.setupStub();
        featuredChannelManagerServiceStub.setupStub();
        viewHistoryManagerServiceStub.setupStub();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $compile = $injector.get('$compile');
        $interval = $injector.get('$interval');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('featuredChannel');

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

        let channels;

        beforeEach('$onInit() test setup', () => {

            channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            featuredChannelManagerServiceStub.getFeaturedChannels.returns($q.resolve(channels));
        });

        it('should use featured channel manager service and channel manager service to load channels on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(featuredChannelManagerServiceStub.getFeaturedChannels);
            sinonExpect.calledOnce(channelManagerServiceStub.refreshChannels);
            sinonExpect.calledWith(channelManagerServiceStub.refreshChannels, [], channels);
        });

        it('should load channels on initialization', () => {

            const expected = channels.slice();
            channelManagerServiceStub.refreshChannels.callsFake((a, b) => a.push(...b));

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(channelManagerServiceStub.refreshChannels);
            expect(component.channels).to.deep.equal(expected);
        });

        it('should load channels every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            component.$onInit();
            $rootScope.$apply();
            // reset initial call to load channels
            featuredChannelManagerServiceStub.getFeaturedChannels.resetHistory();
            channelManagerServiceStub.refreshChannels.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(featuredChannelManagerServiceStub.getFeaturedChannels, expected);
            sinonExpect.callCount(channelManagerServiceStub.refreshChannels, expected);
        });

        it('should not throw error when failed to load featured channels', () => {

            featuredChannelManagerServiceStub.getFeaturedChannels.returns($q.reject(new Error()));

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
