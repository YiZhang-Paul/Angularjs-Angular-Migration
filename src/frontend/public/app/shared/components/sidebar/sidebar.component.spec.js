import SharedModule from '../../shared.module.ajs';

import { stubAuthenticatorServiceNg1 } from '../../../testing/stubs/custom/authenticator.service.stub';
import { stubChannelHttpServiceNg1 } from '../../../testing/stubs/custom/channel-http.service.stub';
import { stubBookmarkManagerServiceNg1 } from '../../../testing/stubs/custom/bookmark-manager.service.stub';
import { stubViewHistoryManagerServiceNg1 } from '../../../testing/stubs/custom/view-history-manager.service.stub';

const module = angular.mock.module;
const sinonExpect = sinon.assert;

context('sidebar component unit test', () => {

    const tag = '<sidebar></sidebar>';
    const followedChannelsKey = 'Followed Channels';
    const featuredChannelsKey = 'Featured Channels';
    const viewHistoryKey = 'View History';

    let $q;
    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let authenticatorStub;
    let channelHttpStub;
    let bookmarkManagerStub;
    let viewHistoryManagerStub;

    beforeEach(module(SharedModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        authenticatorStub = stubAuthenticatorServiceNg1(module, inject);
        channelHttpStub = stubChannelHttpServiceNg1(module, inject);
        bookmarkManagerStub = stubBookmarkManagerServiceNg1(module, inject);
        viewHistoryManagerStub = stubViewHistoryManagerServiceNg1(module, inject);

        authenticatorStub.setupStub();
        channelHttpStub.setupStub();
        bookmarkManagerStub.setupStub();
        viewHistoryManagerStub.setupStub();

        const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
        bookmarkManagerStub.bookmarks = data.slice();
        viewHistoryManagerStub.histories = data.slice();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('sidebar');
    }));

    it('should resolve', () => {

        componentElement = $compile(tag)($rootScope);
        $rootScope.$apply();

        expect(component).is.not.null;
        expect(componentElement.html()).is.not.empty;
    });

    it('should register routes on initialization', () => {

        const expected = component.options.length;

        expect(component.routes.size).to.equal(expected);
    });

    describe('$onInit()', () => {

        it('should load bookmarks on initialization', () => {

            const expected = bookmarkManagerStub.bookmarks.slice(0, 3);

            component.$onInit();
            $rootScope.$apply();

            const result = component.badges.get(followedChannelsKey);

            expect(result).to.deep.equal(expected);
        });

        it('should not load bookmarks when not authenticated', () => {

            authenticatorStub.isAuthenticated = false;

            component.$onInit();
            $rootScope.$apply();

            expect(component.badges.has(followedChannelsKey)).to.be.false;
        });

        it('should use channel http service to fetch channel data', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(channelHttpStub.getChannels);
        });

        it('should load featured channels on initialization', () => {

            const channels = [

                { id: 1, provider_game_name: 'name_1', game_name: 'name_1' },
                { id: 2, provider_game_name: 'name_2', game_name: 'name_2' },
                { id: 3, provider_game_name: 'name_3', game_name: 'name_3' },
                { id: 4, provider_game_name: 'name_4', game_name: 'name_4' },
                { id: 5, provider_game_name: 'name_5', game_name: 'name_5' }
            ];

            const expected = channels.slice(0, 3);
            channelHttpStub.getChannels.returns($q.resolve(channels));

            component.$onInit();
            $rootScope.$apply();

            const result = component.badges.get(featuredChannelsKey);

            expect(result).to.deep.equal(expected);
        });

        it('should not throw error when failed to load featured channels', () => {

            channelHttpStub.getChannels.returns($q.reject(new Error()));

            component.$onInit();
            $rootScope.$apply();
        });

        it('should load view histories on initialization', () => {

            const expected = viewHistoryManagerStub.histories.slice(0, 3);

            component.$onInit();
            $rootScope.$apply();

            const result = component.badges.get(viewHistoryKey);

            expect(result).to.deep.equal(expected);
        });

        it('should not load view histories when not authenticated', () => {

            authenticatorStub.isAuthenticated = false;

            component.$onInit();
            $rootScope.$apply();

            expect(component.badges.has(viewHistoryKey)).to.be.false;
        });

        it('should register user logged out event listener on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            component.badges.set(followedChannelsKey, []);
            component.badges.set(viewHistoryKey, []);

            $rootScope.$broadcast('userLoggedOut');

            expect(component.badges.has(followedChannelsKey)).to.be.false;
            expect(component.badges.has(viewHistoryKey)).to.be.false;
        });

        it('should register bookmark cached event listener on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            bookmarkManagerStub.bookmarks = bookmarkManagerStub.bookmarks.slice(1);
            const expected = bookmarkManagerStub.bookmarks.slice(0, 3);

            $rootScope.$broadcast('bookmarkCached');
            $rootScope.$apply();

            const result = component.badges.get(followedChannelsKey);

            expect(result).to.deep.equal(expected);
        });

        it('should register followed channel event listener on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            bookmarkManagerStub.bookmarks = bookmarkManagerStub.bookmarks.slice(1);
            const expected = bookmarkManagerStub.bookmarks.slice(0, 3);

            $rootScope.$broadcast('followedChannel');
            $rootScope.$apply();

            const result = component.badges.get(followedChannelsKey);

            expect(result).to.deep.equal(expected);
        });

        it('should register unfollowed channel event listener on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            bookmarkManagerStub.bookmarks = bookmarkManagerStub.bookmarks.slice(1);
            const expected = bookmarkManagerStub.bookmarks.slice(0, 3);

            $rootScope.$broadcast('unfollowedChannel');
            $rootScope.$apply();

            const result = component.badges.get(followedChannelsKey);

            expect(result).to.deep.equal(expected);
        });

        it('should register view history cached event listener on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            viewHistoryManagerStub.histories = viewHistoryManagerStub.histories.slice(1);
            const expected = viewHistoryManagerStub.histories.slice(0, 3);

            $rootScope.$broadcast('historyCached');
            $rootScope.$apply();

            const result = component.badges.get(viewHistoryKey);

            expect(result).to.deep.equal(expected);
        });

        it('should register view history updated event listener on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            viewHistoryManagerStub.histories = viewHistoryManagerStub.histories.slice(1);
            const expected = viewHistoryManagerStub.histories.slice(0, 3);

            $rootScope.$broadcast('historyUpdated');
            $rootScope.$apply();

            const result = component.badges.get(viewHistoryKey);

            expect(result).to.deep.equal(expected);
        });

        it('should register view history removed event listener on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            viewHistoryManagerStub.histories = viewHistoryManagerStub.histories.slice(1);
            const expected = viewHistoryManagerStub.histories.slice(0, 3);

            $rootScope.$broadcast('historyRemoved');
            $rootScope.$apply();

            const result = component.badges.get(viewHistoryKey);

            expect(result).to.deep.equal(expected);
        });

        it('should register view history cleared event listener on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            viewHistoryManagerStub.histories = viewHistoryManagerStub.histories.slice(1);
            const expected = viewHistoryManagerStub.histories.slice(0, 3);

            $rootScope.$broadcast('historyCleared');
            $rootScope.$apply();

            const result = component.badges.get(viewHistoryKey);

            expect(result).to.deep.equal(expected);
        });
    });

    describe('options', () => {

        it('should return all options when authenticated', () => {

            authenticatorStub.isAuthenticated = true;

            expect(component.options.length).to.equal(3);
        });

        it('should return featured channel option only when not authenticated', () => {

            authenticatorStub.isAuthenticated = false;

            expect(component.options.length).to.equal(1);
            expect(component.options[0]).to.equal(featuredChannelsKey);
        });
    });
});
