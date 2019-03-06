import ViewHistoryModule from '../view-history.module.ajs';

import { stubViewHistoryManagerServiceNg1 } from '../../../testing/stubs/custom/view-history-manager.service.stub';
import { stubViewHistoryListServiceNg1 } from '../../../testing/stubs/custom/view-history-list.service.stub';
import { stubCustomRoutingServiceNg1 } from '../../../testing/stubs/custom/custom-routing.service.stub';

const module = angular.mock.module;
const sinonExpect = sinon.assert;

context('view history list component unit test', () => {

    const tag = '<view-history-list></view-history-list>';

    let $q;
    let $compile;
    let $rootScope;
    let component;
    let componentElement;

    let viewHistoryManagerStub;
    let viewHistoryListServiceStub;
    let customRoutingStub;

    beforeEach(module(ViewHistoryModule));
    beforeEach(module('component-templates'));

    beforeEach('stubs setup', () => {

        viewHistoryManagerStub = stubViewHistoryManagerServiceNg1(module, inject);
        viewHistoryListServiceStub = stubViewHistoryListServiceNg1(module, inject);
        customRoutingStub = stubCustomRoutingServiceNg1(module, inject);

        viewHistoryManagerStub.setupStub();
        viewHistoryListServiceStub.setupStub();
        customRoutingStub.setupStub();
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

            sinonExpect.calledOnce(viewHistoryManagerStub.cacheHistories);
        });
    });

    describe('histories', () => {

        it('should reference cache from view history manager service', () => {

            viewHistoryManagerStub.histories = [{ id: 1 }, { id: 4 }, { id: 7 }];
            const expected = viewHistoryManagerStub.histories.slice();

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

        it('should use custom routing service to change route', () => {

            const expected = 17;

            component.toChannelsView(expected);

            sinonExpect.calledOnce(customRoutingStub.toChannelsView);
            sinonExpect.calledWith(customRoutingStub.toChannelsView, expected);
        });
    });

    describe('deleteHistory()', () => {

        const id = 55;

        it('should use view history manager service to delete view history', () => {

            component.deleteHistory({ id });
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryManagerStub.deleteHistory);
            sinonExpect.calledWith(viewHistoryManagerStub.deleteHistory, id);
        });
    });

    describe('confirmClearHistories()', () => {

        it('should show confirmation dialog', () => {

            const expected = { payload: 'random_payload' };

            component.confirmClearHistories(expected);
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryListServiceStub.showClearHistoriesDialog);
            sinonExpect.calledWith(viewHistoryListServiceStub.showClearHistoriesDialog, expected);
        });

        it('should use view history manager service to delete view histories when user confirms deletion', () => {

            component.confirmClearHistories({});
            $rootScope.$apply();

            sinonExpect.calledOnce(viewHistoryManagerStub.clearHistories);
        });

        it('should not delete view histories when user cancels deletion', () => {

            viewHistoryListServiceStub.showClearHistoriesDialog.returns($q.reject(new Error()));

            component.confirmClearHistories({});
            $rootScope.$apply();

            sinonExpect.notCalled(viewHistoryManagerStub.clearHistories);
        });

        it('should not throw error when user cancels deletion', () => {

            viewHistoryListServiceStub.showClearHistoriesDialog.returns($q.reject(new Error()));

            component.confirmClearHistories({});
            $rootScope.$apply();
        });
    });
});
