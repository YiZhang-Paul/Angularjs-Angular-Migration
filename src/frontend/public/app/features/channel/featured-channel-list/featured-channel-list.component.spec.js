import ChannelModule from '../channel.module.ajs';

import { stubChannelServiceNg1 } from '../../../testing/stubs/custom/channel.service.stub';
import { stubBookmarkManagerServiceNg1 } from '../../../testing/stubs/custom/bookmark-manager.service.stub';
import { stubViewHistoryManagerServiceNg1 } from '../../../testing/stubs/custom/view-history-manager.service.stub';

const module = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('featured channel list component unit test', () => {

    const tag = '<featured-channel-list></featured-channel-list>';

    let $compile;
    let $interval;
    let $rootScope;
    let component;
    let componentElement;

    let channelServiceStub;
    let bookmarkManagerStub;
    let viewHistoryManagerStub;

    beforeEach(module(ChannelModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        channelServiceStub = stubChannelServiceNg1(module, inject);
        bookmarkManagerStub = stubBookmarkManagerServiceNg1(module, inject);
        viewHistoryManagerStub = stubViewHistoryManagerServiceNg1(module, inject);

        channelServiceStub.setupStub();
        bookmarkManagerStub.setupStub();
        viewHistoryManagerStub.setupStub();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $compile = $injector.get('$compile');
        $interval = $injector.get('$interval');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('featuredChannelList');

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

        it('should use channel service to load channels on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(channelServiceStub.loadFeaturedChannels);
        });

        it('should load channels every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            component.$onInit();
            $rootScope.$apply();
            // reset initial call to load channels
            channelServiceStub.loadFeaturedChannels.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(channelServiceStub.loadFeaturedChannels, expected);
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

        it('should use bookmark manager service to check channel status', () => {

            const expected = { channel_id: 5 };

            const result = component.isFollowed(expected);
            $rootScope.$apply();

            expect(result).to.be.true;
            sinonExpect.calledOnce(bookmarkManagerStub.isFollowed);
            sinonExpect.calledWith(bookmarkManagerStub.isFollowed, expected);
        });
    });

    describe('follow()', () => {

        it('should use bookmark manager service to follow channel', () => {

            const expected = { channel_id: 5 };

            component.follow(expected);
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkManagerStub.follow);
            sinonExpect.calledWith(bookmarkManagerStub.follow, expected);
        });
    });

    describe('unfollow()', () => {

        it('should use bookmark manager service to unfollow channel', () => {

            const expected = { channel_id: 5 };

            component.unfollow(expected);
            $rootScope.$apply();

            sinonExpect.calledOnce(bookmarkManagerStub.unfollow);
            sinonExpect.calledWith(bookmarkManagerStub.unfollow, expected);
        });
    });

    describe('addHistory()', () => {

        it('should use view history manager service to add view history', () => {

            const expected = { channel_id: 5 };

            component.addHistory(expected);
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryManagerStub.addHistory);
            sinonExpect.calledWith(viewHistoryManagerStub.addHistory, expected);
        });
    });
});
