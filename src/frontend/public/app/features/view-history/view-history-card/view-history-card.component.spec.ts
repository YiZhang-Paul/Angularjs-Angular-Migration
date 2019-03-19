import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { ViewHistoryModule } from '../view-history.module';

import { ViewHistoryCardComponent } from './view-history-card.component';

context('view history card component unit test', () => {

    let fixture: ComponentFixture<ViewHistoryCardComponent>;
    let component: ViewHistoryCardComponent;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [ViewHistoryModule]
        });

        fixture = TestBed.createComponent(ViewHistoryCardComponent);
        component = fixture.componentInstance;
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(ViewHistoryCardComponent);
    });
});
