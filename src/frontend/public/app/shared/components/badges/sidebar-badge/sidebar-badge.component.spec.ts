import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { SharedModule } from '../../../shared.module';
import { CustomRoutingService } from '../../../../core/upgraded-providers/custom-routing-provider/custom-routing-provider';
import { stubCustomRoutingService } from '../../../../testing/stubs/custom/custom-routing.service.stub.js';

import { SidebarBadgeComponent } from './sidebar-badge.component';

context('sidebar badge component unit test', () => {

    let fixture: ComponentFixture<SidebarBadgeComponent>;
    let component: SidebarBadgeComponent;

    let customRoutingServiceStub;

    beforeEach('stubs setup', () => {

        customRoutingServiceStub = stubCustomRoutingService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule],
            providers: [{ provide: CustomRoutingService, useValue: customRoutingServiceStub }]
        });

        fixture = TestBed.createComponent(SidebarBadgeComponent);
        component = fixture.componentInstance;
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(SidebarBadgeComponent);
    });
});
