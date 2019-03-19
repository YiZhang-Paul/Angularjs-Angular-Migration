import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { SharedModule } from '../../../shared.module';

import { SidebarBadgeComponent } from './sidebar-badge.component';

context('sidebar badge component unit test', () => {

    let fixture: ComponentFixture<SidebarBadgeComponent>;
    let component: SidebarBadgeComponent;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule]
        });

        fixture = TestBed.createComponent(SidebarBadgeComponent);
        component = fixture.componentInstance;
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(SidebarBadgeComponent);
    });
});
