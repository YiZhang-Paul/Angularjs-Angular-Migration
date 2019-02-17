import SharedModule from '../../../shared/shared.module.ajs';
import ChannelModule from '../channel.module.ajs';

import { stubChannelServiceNg1 } from '../../../testing/stubs/custom/channel.service.stub';
import { stubBookmarkManagerServiceNg1 } from '../../../testing/stubs/custom/bookmark-manager.service.stub';
import { stubViewHistoryManagerServiceNg1 } from '../../../testing/stubs/custom/view-history-manager.service.stub';

const module = angular.mock.module;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('game channel list component unit test', () => {

    const tag = '<game-channel-list></game-channel-list>';

    let $compile;
    let $interval;
    let $rootScope;
    let $stateParams;
    let component;
    let componentElement;

    let channelServiceStub;
    let bookmarkManagerStub;
    let viewHistoryManagerStub;

    beforeEach(module('ui.router'));
    beforeEach(module(SharedModule));
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
        $stateParams = $injector.get('$stateParams');
        component = $componentController('gameChannelList');

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
        let channels;

        beforeEach('$onInit() test setup', () => {

            channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            $stateParams.name = name;
            $stateParams.channels = channels;
        });

        it('should set name value with all dashes removed', () => {

            component.$onInit();
            $rootScope.$apply();

            expect(component.name).to.equal('some game 5');
        });

        it('should load data from state parameters when channels data exist', () => {

            component.$onInit();
            $rootScope.$apply();

            expect(component.channels).to.deep.equal(channels);
            sinonExpect.notCalled(channelServiceStub.loadGameChannels);
        });

        it('should fetch game channels from channel service when channels data is missing from state parameters', () => {

            $stateParams.channels = null;

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(channelServiceStub.loadGameChannels);
            sinonExpect.calledWith(channelServiceStub.loadGameChannels, component.channels, component.name);
        });

        it('should load channels every 10 seconds', () => {

            const seconds = 60;
            const expected = Math.floor(seconds / 10);

            component.$onInit();
            $rootScope.$apply();
            // reset initial call to load channels
            channelServiceStub.loadGameChannels.resetHistory();
            $interval.flush(seconds * 1000);

            sinonExpect.callCount(channelServiceStub.loadGameChannels, expected);
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
