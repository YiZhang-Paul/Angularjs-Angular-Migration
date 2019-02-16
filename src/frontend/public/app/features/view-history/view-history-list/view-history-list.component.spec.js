import ViewHistoryModule from '../view-history.module.ajs';

import { stub$stateNg1 } from '../../../testing/stubs/third-party/$state.stub';
import { stubGameHttpServiceNg1 } from '../../../testing/stubs/custom/game-http.service.stub';
import { stubChannelHttpServiceNg1 } from '../../../testing/stubs/custom/channel-http.service.stub';
import { stubViewHistoryManagerServiceNg1 } from '../../../testing/stubs/custom/view-history-manager.service.stub';
import { stubGenericUtilitiesServiceNg1 } from '../../../testing/stubs/custom/generic-utilities.service.stub';

const module = angular.mock.module;
const sinonExpect = sinon.assert;

context('view history list component unit test', () => {

    const tag = '<view-history-list></view-history-list>';

    let $q;
    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let $stateStub;
    let gameHttpServiceStub;
    let channelHttpServiceStub;
    let viewHistoryManagerServiceStub;
    let genericUtilitiesServiceStub;

    beforeEach(module(ViewHistoryModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        $stateStub = stub$stateNg1(module, inject);
        gameHttpServiceStub = stubGameHttpServiceNg1(module, inject);
        channelHttpServiceStub = stubChannelHttpServiceNg1(module, inject);
        viewHistoryManagerServiceStub = stubViewHistoryManagerServiceNg1(module, inject);
        genericUtilitiesServiceStub = stubGenericUtilitiesServiceNg1(module, inject);

        $stateStub.setupStub();
        gameHttpServiceStub.setupStub();
        channelHttpServiceStub.setupStub();
        viewHistoryManagerServiceStub.setupStub();
        genericUtilitiesServiceStub.setupStub();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('viewHistoryList');
    }));

    it('should resolve', () => {

        componentElement = $compile(tag)($rootScope);
        $rootScope.$apply();

        expect(component).is.not.null;
        expect(componentElement.html()).is.not.empty;
    });

    describe('$onInit()', () => {

        it('should cache view histories on initialization', () => {

            component.$onInit();
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryManagerServiceStub.cacheHistories);
        });

        it('should register user authenticated event listener', () => {

            component.$onInit();
            $rootScope.$apply();
            viewHistoryManagerServiceStub.cacheHistories.resetHistory();

            $rootScope.$broadcast('userAuthenticated');

            sinonExpect.calledOnce(viewHistoryManagerServiceStub.cacheHistories);
        });

        it('should register user logged out event listener', () => {

            component.$onInit();
            $rootScope.$apply();
            viewHistoryManagerServiceStub.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];

            $rootScope.$broadcast('userLoggedOut');

            expect(viewHistoryManagerServiceStub.histories).to.be.empty;
            expect(component.histories).to.be.empty;
        });
    });

    describe('histories', () => {

        it('should reference cache from view history manager service', () => {

            viewHistoryManagerServiceStub.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = viewHistoryManagerServiceStub.histories.slice();

            expect(component.histories).to.deep.equal(expected);
        });
    });

    describe('isStaticImage()', () => {

        it('should return true when file is not in mp4 or m4v format', () => {

            expect(component.isStaticImage('file.png')).to.be.true;
        });

        it('should return false for mp4 format', () => {

            expect(component.isStaticImage('file.mp4')).to.be.false;
        });

        it('should return false for m4v format', () => {

            expect(component.isStaticImage('file.m4v')).to.be.false;
        });
    });

    describe('toChannelsView()', () => {

        const id = 55;
        let game;

        beforeEach('toChannelsView() test setup', () => {

            game = { name: 'random game name 5' };
            gameHttpServiceStub.getGame.returns($q.resolve(game));
            genericUtilitiesServiceStub.joinText.returns('');
        });

        it('should use game http service to fetch game data', () => {

            component.toChannelsView(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(gameHttpServiceStub.getGame);
        });

        it('should use channel http service to fetch channel data', () => {

            component.toChannelsView(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(channelHttpServiceStub.getChannelsByGameId);
        });

        it('should change route with correct route parameters', () => {

            const name = 'random-game-name-5';
            const channels = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = { game, name, channels };
            channelHttpServiceStub.getChannelsByGameId.returns($q.resolve(channels));
            genericUtilitiesServiceStub.joinText.returns(name);

            component.toChannelsView(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(genericUtilitiesServiceStub.joinText);
            sinonExpect.calledOnce($stateStub.go);
            sinonExpect.calledWith($stateStub.go, 'index.channels', expected);
        });

        it('should not throw on error', () => {

            gameHttpServiceStub.getGame.returns($q.reject(new Error()));
            channelHttpServiceStub.getChannelsByGameId.returns($q.reject(new Error()));

            component.toChannelsView(id);
            $rootScope.$apply();
        });
    });

    describe('deleteHistory()', () => {

        const id = 55;

        it('should use view history manager service to delete view history', () => {

            component.deleteHistory({ id });
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryManagerServiceStub.deleteHistory);
            sinonExpect.calledWith(viewHistoryManagerServiceStub.deleteHistory, id);
        });
    });

    describe('confirmClearHistories()', () => {

        it('should show confirmation dialog', () => {

            const expected = { payload: 'random_payload' };

            component.confirmClearHistories(expected);
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryManagerServiceStub.showClearHistoriesDialog);
            sinonExpect.calledWith(viewHistoryManagerServiceStub.showClearHistoriesDialog, expected);
        });

        it('should use view history manager service to delete view histories when user confirms deletion', () => {

            component.confirmClearHistories({});
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryManagerServiceStub.clearHistories);
        });

        it('should not delete view histories when user cancels deletion', () => {

            viewHistoryManagerServiceStub.showClearHistoriesDialog.returns($q.reject(new Error()));

            component.confirmClearHistories({});
            $rootScope.$apply();

            sinonExpect.notCalled(viewHistoryManagerServiceStub.clearHistories);
        });

        it('should not throw error when user cancels deletion', () => {

            viewHistoryManagerServiceStub.showClearHistoriesDialog.returns($q.reject(new Error()));

            component.confirmClearHistories({});
            $rootScope.$apply();
        });
    });
});
