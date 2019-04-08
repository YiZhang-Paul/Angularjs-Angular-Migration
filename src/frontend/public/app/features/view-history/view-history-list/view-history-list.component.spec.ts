import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { ViewHistoryModule } from '../view-history.module';
import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';
import { ViewHistoryManager } from '../../../core/upgraded-providers/view-history-manager-provider/view-history-manager-provider';
import { stubCustomRoutingService } from '../../../testing/stubs/custom/custom-routing.service.stub.js';
import { stubViewHistoryManagerService } from '../../../testing/stubs/custom/view-history-manager.service.stub.js';
import { stubViewHistoryListService } from '../../../testing/stubs/custom/view-history-list.service.stub.js';

import { ViewHistoryListService } from './view-history-list.service';
import { ViewHistoryListComponent } from './view-history-list.component';

context('view history list component unit test', () => {

    let fixture: ComponentFixture<ViewHistoryListComponent>;
    let component: ViewHistoryListComponent;

    let customRoutingStub;
    let viewHistoryManagerStub;
    let viewHistoryListServiceStub;

    beforeEach('stubs setup', () => {

        customRoutingStub = stubCustomRoutingService();
        viewHistoryManagerStub = stubViewHistoryManagerService();
        viewHistoryListServiceStub = stubViewHistoryListService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [ViewHistoryModule],
            providers: [

                { provide: CustomRoutingService, useValue: customRoutingStub },
                { provide: ViewHistoryManager, useValue: viewHistoryManagerStub },
                { provide: ViewHistoryListService, useValue: viewHistoryListServiceStub }
            ]
        });

        fixture = TestBed.createComponent(ViewHistoryListComponent);
        component = fixture.componentInstance;
        customRoutingStub = TestBed.get(CustomRoutingService);
        viewHistoryManagerStub = TestBed.get(ViewHistoryManager);
        viewHistoryListServiceStub = TestBed.get(ViewHistoryListService);
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(ViewHistoryListComponent);
    });

    describe('$onInit()', () => {

        it('should cache view histories on initialization', () => {

            viewHistoryManagerStub.histories = [];
            fixture.detectChanges();

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

        it('should use view history manager service to delete view history', () => {

            const id = 55;

            component.deleteHistory({ id });

            sinonExpect.calledOnce(viewHistoryManagerStub.deleteHistory);
            sinonExpect.calledWith(viewHistoryManagerStub.deleteHistory, id);
        });
    });

    describe('confirmClearHistories()', () => {

        it('should show confirmation dialog', () => {

            const expected = { payload: 'random_payload' };

            component.confirmClearHistories(expected);

            sinonExpect.calledOnce(viewHistoryListServiceStub.showClearHistoriesDialog);
            sinonExpect.calledWith(viewHistoryListServiceStub.showClearHistoriesDialog, expected);
        });

        it('should use view history manager service to delete view histories when user confirms deletion', fakeAsync(() => {

            component.confirmClearHistories({});
            tick();

            sinonExpect.calledOnce(viewHistoryManagerStub.clearHistories);
        }));

        it('should not delete view histories when user cancels deletion', fakeAsync(() => {

            viewHistoryListServiceStub.showClearHistoriesDialog.rejects(new Error());

            component.confirmClearHistories({});
            tick();

            sinonExpect.notCalled(viewHistoryManagerStub.clearHistories);
        }));

        it('should not throw error when user cancels deletion', fakeAsync(() => {

            viewHistoryListServiceStub.showClearHistoriesDialog.rejects(new Error());

            component.confirmClearHistories({});
            tick();
        }));
    });
});
