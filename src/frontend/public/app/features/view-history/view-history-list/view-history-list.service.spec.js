import ViewHistoryModule from '../view-history.module.ajs';

const module = angular.mock.module;
const spy = sinon.spy;
const stub = sinon.stub;
const sinonExpect = sinon.assert;

context('view history list service unit test', () => {

    let $mdDialog;
    let $rootScope;
    let service;

    beforeEach(module('ngMaterial'));
    beforeEach(module(ViewHistoryModule));

    beforeEach('general test setup', inject($injector => {

        $mdDialog = $injector.get('$mdDialog');
        $rootScope = $injector.get('$rootScope');
        service = $injector.get('viewHistoryListService');

        spy($mdDialog, 'confirm');
        stub($mdDialog, 'show');
    }));

    afterEach('general test teardown', () => {

        $mdDialog.confirm.restore();
        $mdDialog.show.restore();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
    });

    describe('showClearHistoriesDialog()', () => {

        it('should show confirmation dialog', () => {

            service.showClearHistoriesDialog({});
            $rootScope.$apply();

            sinonExpect.calledOnce($mdDialog.confirm);
            sinonExpect.calledOnce($mdDialog.show);
        });

        it('should bind confirmation dialog to correct event', () => {

            const expected = { payload: 'random_payload' };

            service.showClearHistoriesDialog(expected);
            $rootScope.$apply();

            const argument = $mdDialog.show.getCall(0).args[0];
            const result = argument._options.targetEvent;

            expect(result).to.deep.equal(expected);
        });
    });
});
