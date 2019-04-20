import { ComponentFixture, TestBed } from '@angular/core/testing';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { ViewHistoryModule } from '../view-history.module';
import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';
import { ViewHistoryManagerService } from '../../../core/services/data-managers/view-history-manager/view-history-manager.service';
import { stubCustomRoutingService } from '../../../testing/stubs/custom/custom-routing.service.stub';
import { stubViewHistoryManagerService } from '../../../testing/stubs/custom/view-history-manager.service.stub';

import { ViewHistoryListComponent } from './view-history-list.component';

context('view history list component unit test', () => {

    let fixture: ComponentFixture<ViewHistoryListComponent>;
    let component: ViewHistoryListComponent;

    let customRoutingStub: any;
    let viewHistoryManagerStub: any;

    beforeEach('stubs setup', () => {

        customRoutingStub = stubCustomRoutingService();
        viewHistoryManagerStub = stubViewHistoryManagerService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [ViewHistoryModule],
            providers: [

                { provide: CustomRoutingService, useValue: customRoutingStub },
                { provide: ViewHistoryManagerService, useValue: viewHistoryManagerStub }
            ]
        });

        fixture = TestBed.createComponent(ViewHistoryListComponent);
        component = fixture.componentInstance;
        customRoutingStub = TestBed.get(CustomRoutingService);
        viewHistoryManagerStub = TestBed.get(ViewHistoryManagerService);
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
});
