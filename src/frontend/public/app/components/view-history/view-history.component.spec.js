import ComponentsModule from '../components.module';

import { mock$state } from '../../../testing/stubs/$state.stub';
import { mockGameHttpService } from '../../../testing/stubs/game-http.service.stub';
import { mockChannelHttpService } from '../../../testing/stubs/channel-http.service.stub';
import { mockViewHistoryService } from '../../../testing/stubs/view-history.service.stub';
import { mockGenericUtilityService } from '../../../testing/stubs/generic-utility.service.stub';

const mockModule = angular.mock.module;
const sinonExpect = sinon.assert;

context('view history component unit test', () => {

    const tag = '<view-history></view-history>';

    let $q;
    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let $stateStub;
    let gameHttpServiceStub;
    let channelHttpServiceStub;
    let viewHistoryServiceStub;
    let genericUtilityServiceStub;

    beforeEach(mockModule(ComponentsModule));
    beforeEach(mockModule('component-templates'));

    beforeEach('mocks setup', () => {

        $stateStub = mock$state(mockModule);
        gameHttpServiceStub = mockGameHttpService(mockModule, inject);
        channelHttpServiceStub = mockChannelHttpService(mockModule, inject);
        viewHistoryServiceStub = mockViewHistoryService(mockModule, inject);
        genericUtilityServiceStub = mockGenericUtilityService(mockModule);

        gameHttpServiceStub.initializeMock();
        channelHttpServiceStub.initializeMock();
        viewHistoryServiceStub.initializeMock();
    });

    beforeEach('general test setup', inject(($injector, $componentController) => {

        $q = $injector.get('$q');
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        component = $componentController('viewHistory');
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

            sinonExpect.calledOnce(viewHistoryServiceStub.cacheHistories);
        });
    });

    describe('histories', () => {

        it('should reference cache from view history service', () => {

            viewHistoryServiceStub.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = viewHistoryServiceStub.histories.slice();

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
            genericUtilityServiceStub.joinText.returns('');
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
            genericUtilityServiceStub.joinText.returns(name);

            component.toChannelsView(id);
            $rootScope.$apply();

            sinonExpect.calledOnce(genericUtilityServiceStub.joinText);
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

        it('should use view history service to delete view history', () => {

            component.deleteHistory({ id });
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryServiceStub.deleteHistory);
            sinonExpect.calledWith(viewHistoryServiceStub.deleteHistory, id);
        });
    });

    describe('confirmClearHistories()', () => {

        it('should show confirmation dialog', () => {

            const expected = { payload: 'random_payload' };

            component.confirmClearHistories(expected);
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryServiceStub.showClearHistoriesDialog);
            sinonExpect.calledWith(viewHistoryServiceStub.showClearHistoriesDialog, expected);
        });

        it('should use view history service to delete view histories when user confirms deletion', () => {

            component.confirmClearHistories({});
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryServiceStub.clearHistories);
        });

        it('should not delete view histories when user cancels deletion', () => {

            viewHistoryServiceStub.showClearHistoriesDialog.returns($q.reject(new Error()));

            component.confirmClearHistories({});
            $rootScope.$apply();

            sinonExpect.notCalled(viewHistoryServiceStub.clearHistories);
        });

        it('should not throw error when user cancels deletion', () => {

            viewHistoryServiceStub.showClearHistoriesDialog.returns($q.reject(new Error()));

            component.confirmClearHistories({});
            $rootScope.$apply();
        });
    });
});
