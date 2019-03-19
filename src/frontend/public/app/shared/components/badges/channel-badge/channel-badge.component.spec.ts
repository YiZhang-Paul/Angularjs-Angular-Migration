import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { SharedModule } from '../../../shared.module';

import { ChannelBadgeComponent } from './channel-badge.component';

context('channel badge component unit test', () => {

    let fixture: ComponentFixture<ChannelBadgeComponent>;
    let component: ChannelBadgeComponent;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule]
        });

        fixture = TestBed.createComponent(ChannelBadgeComponent);
        component = fixture.componentInstance;
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(ChannelBadgeComponent);
    });
});
