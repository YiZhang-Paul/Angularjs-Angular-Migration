import { TestBed } from '@angular/core/testing';
import { assert as sinonExpect, spy, stub } from 'sinon';
import { expect } from 'chai';
import * as angular from 'angular';

import { $mdDialog, $mdDialogFactory } from '../../../core/upgraded-providers/$mdDialog-provider/$mdDialog-provider';

import { ViewHistoryListService } from './view-history-list.service';

const module = angular.mock.module;
const inject = angular.mock.inject;

context('view history list service unit test', () => {

    let $mdDialogStub;
    let service: ViewHistoryListService;

    beforeEach(module('ngMaterial'));

    beforeEach('general test setup', inject($injector => {

        TestBed.configureTestingModule({

            providers: [

                ViewHistoryListService,
                { provide: $mdDialog, useValue: $mdDialogFactory($injector) }
            ]
        });

        service = TestBed.get(ViewHistoryListService);
        $mdDialogStub = TestBed.get($mdDialog);
        spy($mdDialogStub, 'confirm');
        stub($mdDialogStub, 'show');
    }));

    afterEach('general test teardown', () => {

        $mdDialogStub.confirm.restore();
        $mdDialogStub.show.restore();
    });

    it('should resolve', () => {

        expect(service).is.not.null;
        expect(service).to.be.instanceOf(ViewHistoryListService);
    });

    describe('showClearHistoriesDialog()', () => {

        it('should show confirmation dialog', () => {

            service.showClearHistoriesDialog({});

            sinonExpect.calledOnce($mdDialogStub.confirm);
            sinonExpect.calledOnce($mdDialogStub.show);
        });

        it('should bind confirmation dialog to correct event', () => {

            const expected = { payload: 'random_payload' };

            service.showClearHistoriesDialog(expected);

            const argument = $mdDialogStub.show.getCall(0).args[0];
            const result = argument._options.targetEvent;

            expect(result).to.deep.equal(expected);
        });
    });
});
